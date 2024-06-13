<div id="app">
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
  window.onload = function() {
      loadchart();
  };
  async function getJson() {
      let response = await fetch("/history");
      let data = await response.json();
      return data;
  };
  async function loadchart() {
    const dat = await getJson();
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
          self.connection = new WebSocket("wss://stream.bybit.com/realtime");
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
  </script>