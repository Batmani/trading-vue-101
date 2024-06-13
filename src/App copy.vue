<!-- <template>
    <trading-vue ref="tvjs" :data="chart"  :legend-buttons="['display']" v-on:legend-button-click="on_button_click"
        :overlays="overlays" :width="this.width" :height="this.height">
    </trading-vue>
</template>

<script>
  window.onload = function() {
      loadchart();
  };
import XP from 'tvjs-xp'
import {TradingVue, DataCube} from 'trading-vue-js'
import Data from '../data/data.json'
import Overlays from 'tvjs-overlays'
import Utils from '../src/DataHelper/utils.js'
import Const from '../src/DataHelper/constants.js'
import Stream from '../src/DataHelper/stream.js'
const PORT = location.port
const URL = `http://localhost:${PORT}/api/v1/klines?symbol=`
const WSS = `ws://localhost:${PORT}/ws/btcusdt@aggTrade`
import Vue from 'vue';
 async function loadchart() {
    const app = new Vue({
        el: '#app',
    components: { TradingVue, },
    methods: {
    },
    props: ['night'],

    mounted() {
        window.addEventListener('resize', this.onResize)
        this.onResize()
        let now = Utils.now()
        this.load_chunk([now - Const.HOUR4, now]).then(data => {
            this.chart = new DataCube({
                ohlcv: data['chart.data'],
                onchart: [{
                    type: 'EMAx6',
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
            }, { aggregation: 100 })
            // Register onrange callback & And a stream of trades
            this.chart.onrange(this.load_chunk)
            this.$refs.tvjs.resetChart();

            this.stream = new Stream(WSS)
            this.stream.ontrades = this.on_trades
            window.dc = this.chart      // Debug
            window.tv = this.$refs.tvjs // Debug

        })
    },
    methods: {
        onResize(event) {
            this.width = window.innerWidth
            this.height = window.innerHeight - 50
        },
        // New data handler. Should return Promise, or
        // use callback: load_chunk(range, tf, callback)
        async load_chunk(range) {
            let [t1, t2] = range
            let x = 'BTCUSDT'
            let q = `${x}&interval=1m&startTime=${t1}&endTime=${t2}`
            let r = await fetch(URL + q).then(r => r.json())
            return this.format(this.parse_binance(r))
        },
        // Parse a specific exchange format
        parse_binance(data) {
            if (!Array.isArray(data)) return []
            return data.map(x => {
                for (var i = 0; i < x.length; i++) {
                    x[i] = parseFloat(x[i])
                }
                return x.slice(0,6)
            })
        },
        format(data) {
            // Each query sets data to a corresponding overlay
            return {
                'chart.data': data
                // other onchart/offchart overlays can be added here,
                // but we are using Script Engine to calculate some:
                // see EMAx6 & BuySellBalance
            }
        },
        on_trades(trade) {
            this.chart.update({
                t: trade.T,     // Exchange time (optional)
                price: parseFloat(trade.p),   // Trade price
                volume: parseFloat(trade.q),  // Trade amount
                'datasets.binance-btcusdt': [ // Update dataset
                    trade.T,
                    trade.m ? 0 : 1,          // Sell or Buy
                    parseFloat(trade.q),
                    parseFloat(trade.p)
                ],
                // ... other onchart/offchart updates
            })
        }
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize)
        if (this.stream) this.stream.off()
    },
    computed: {
        colors() {
            return this.$props.night ? {} : {
                colorBack: '#fff',
                colorGrid: '#eee',
                colorText: '#333'
            }
        },
    },
    data() {
        return {
            chart: {},
            width: window.innerWidth,
            height: window.innerHeight,
            index_based: false,
            overlays: [ScriptOverlay, BSB]
        }
    }})

    
}
</script> -->




<!-- <div id="app">
    <trading-vue :data="data"
      :width="1330"
      :height="528"
      title-txt="BTCUSDT"
      :chart-config="{DEFAULT_LEN:120}"
      :toolbar="true"
      :color-back="colors.colorBack"
      :color-grid="colors.colorGrid"
      :color-text="colors.colorText">
    </trading-vue>
  </div>
  <script>
  import Vue from 'vue';
  window.onload = function() {
      loadchart();
  };
  
  async function loadchart() {
    const app = new Vue({
      el: '#app',
      data: function () {
        return {
          connection: null,
          data: {},
          width: window.innerWidth,
          height: window.innerHeight,
          night: true
        }
      },
      created() {
        this.setData(dat);
        this.getCandles();
      },
      mounted() {
        window.addEventListener('resize', this.onResize)
      },
      methods: {
        onResize(event) {
          this.width = window.innerWidth
          this.height = window.innerHeight
        },
        setData(event) {
          this.data = new TradingVueJs.DataCube({
            ohlcv: event.ohlcv,
            onchart: event.onchart,
            offchart: event.offchart
          });
        },
        getCandles() {
          const self = this;
          self.connection = new WebSocket("ws://localhost:${PORT}/ws/btcusdt@aggTrade");
          self.connection.addEventListener("message", (event) => {
            let message = JSON.parse(event.data);
            if (message.hasOwnProperty("data")) {
              var ulist = new Array();
              var candle = message.data['0'];
              ulist.push([candle.start,candle.open,candle.high,candle.low,candle.close,candle.volume]);
              self.data.update(new TradingVueJs.DataCube({"ohlcv": ulist, "onchart": [], "offchart": []}));
            };
          });
          self.connection.onopen = function() {
            var msg = {op: 'subscribe',args: ['klineV2.5.BTCUSD']};
            var json = JSON.stringify(msg);
            self.connection.send(json);
          }
        }
      },
      computed: {
        colors() {
          return this.night ? {} : {
              colorBack: '#fff',
              colorGrid: '#eee',
              colorText: '#333'
          }
        }
      },
      beforeDestroy() {
          window.removeEventListener('resize', this.onResize)
      }
    })
  }
  </script> -->