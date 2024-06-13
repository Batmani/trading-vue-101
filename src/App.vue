<template>
    <div id="app">
      <tf-selector :charts="availableTimeframes" @selected="onTimeframeSelected"></tf-selector>
      <trading-vue
        ref="tvjs"
        :data="chartData"
        :toolbar="true"
        :legend-buttons="['display']"
        @legend-button-click="onButtonClick"
        :width="width"
        :height="height"
      ></trading-vue>
      <button @click="resetChart">Reset Chart</button>
    </div>
  </template>
  
  <script>
  import { TradingVue, DataCube } from 'trading-vue-js';
  import TfSelector from './components/TFSelector.vue';
  import Utils from '../src/DataHelper/utils.js';
  import Const from '../src/DataHelper/constants.js';
  import Stream from '../src/DataHelper/stream.js';
//   import Overlays from 'tvjs-overlays';
//   import Extensions from 'tvjs-xp';
  
  const PORT = location.port;
  const URL = `http://localhost:${PORT}/api/v1/klines?symbol=BTCUSDT`;
  const WSS = `ws://localhost:${PORT}/ws/btcusdt@aggTrade`;
  
  export default {
    name: 'App',
    components: {
      TradingVue,
      TfSelector,
    },
    data() {
      return {
        chartData: new DataCube({
          ohlcv: [],
          onchart: [],
          offchart: [],
          datasets: [],
        }),
        width: window.innerWidth,
        height: window.innerHeight - 50,
        index_based: false,
        // overlays: Object.values(Overlays),
        // extensions: Object.values(Extensions),
        availableTimeframes: {
          '1m': '1 Minute',
          '5m': '5 Minutes',
          '1h': '1 Hour',
          '1d': '1 Day'
        },
        selectedTimeframe: '1m'
      };
    },
    mounted() {
        this.initChartData();
        window.addEventListener('resize', this.onResize);
      this.onResize();
      this.loadChart();
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onResize);
      if (this.stream) this.stream.off();
    },
    methods: {
      initChartData() {
        console.log('Initializing chart data');
        // Ensure all necessary properties are initialized
        if (!this.chartData.chart) {
          this.$set(this.chartData, 'chart', {
            type: 'Candles',
            data: this.chartData.ohlcv || []
          });
        }
  
        if (!this.chartData.onchart) {
          this.$set(this.chartData, 'onchart', []);
        }
  
        if (!this.chartData.offchart) {
          this.$set(this.chartData, 'offchart', []);
        }
  
        if (!this.chartData.chart.settings) {
          this.$set(this.chartData.chart, 'settings', {});
        }
  
        // Remove ohlcv because we have Data v1.1^
        this.$delete(this.chartData, 'ohlcv');
  
        if (!this.chartData.datasets) {
          this.$set(this.chartData, 'datasets', []);
        }
  
        // Initialize dataset proxies
        if (!this.dss) this.dss = {};
        for (let ds of this.chartData.datasets) {
          this.dss[ds.id] = new Dataset(this, ds);
        }
      },
      onResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight - 50;
      },
      async loadChart() {
        console.log('Loading chart data');
        let now = Utils.now();
        try {
          const data = await this.loadChunk([now - Const.HOUR4, now]);
          console.log('Chart data loaded:', data);
          this.chartData= new DataCube({
            ohlcv: data['chart.data'],
            onchart: [{
              type: 'EMA',
              name: 'Multiple EMA',
              data: []
            }],
            offchart: [{
              type: 'BuySellBalance',
              name: 'Buy/Sell Balance, $lookback',
              data: [],
              settings: {}
            }],
            datasets: [{
              type: 'Trades',
              id: 'binance-btcusdt',
              data: []
            }]
        }, { aggregation: 100 });
  
          this.chartData.onrange(this.loadChunk);
  
          this.$nextTick(() => {
            if (this.$refs.tvjs) {
              this.$refs.tvjs.resetChart();
            } else {
              console.error('tradingVue ref is not available');
            }
            this.stream = new Stream(WSS);
            this.stream.ontrades = this.onTrades;
            window.dc = this.chartData; // Debug
            window.tv = this.$refs.tvjs; // Debug
          });
        } catch (error) {
          console.error('Error loading chart data:', error);
        }
      },
      async loadChunk(range) {
        let [t1, t2] = range;
        let q = `&interval=${this.selectedTimeframe}&startTime=${t1}&endTime=${t2}`;
        let r = await fetch(URL + q).then(r => r.json());
        return this.format(this.parseBinance(r));
      },
      parseBinance(data) {
        if (!Array.isArray(data)) return [];
        return data.map(x => {
          return x.slice(0, 6).map(parseFloat);
        });
      },
      format(data) {
        return { 'chart.data': data };
      },
      onTrades(trade) {
        console.log('Trade update:', trade);
        this.chartData.update({
          t: trade.T,
          price: parseFloat(trade.p),
          volume: parseFloat(trade.q),
          'datasets.binance-btcusdt': [
            trade.T,
            trade.m ? 0 : 1,
            parseFloat(trade.q),
            parseFloat(trade.p)
          ]
        });
      },
      resetChart() {
        if (this.$refs.tvjs) {
          this.$refs.tvjs.resetChart();
        } else {
          console.error('tradingVue ref is not available');
        }
      },
      onButtonClick(button) {
        console.log('Button clicked:', button);
      },
      onTimeframeSelected(selection) {
        this.selectedTimeframe = selection.name;
        this.loadChart();
      }
    }
  };
  </script>
  
  <style>
  /* Add any additional styling here */
  </style>
  