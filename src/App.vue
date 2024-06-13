<template>
<trading-vue :data="chart"  :legend-buttons="['display']"
v-on:legend-button-click="on_button_click" :overlays="overlays" :width="this.width" 
:height="this.height">
</trading-vue>
</template>

<script>
import XP from 'tvjs-xp'
import TradingVue from 'trading-vue-js'
import Data from  '../data/data.json'
import Overlays from 'tvjs-overlays'
export default {
    name: 'app',
    components: { TradingVue,   },
    methods: {
        onResize(event) {
            this.width = window.innerWidth
            this.height = window.innerHeight
        },
        on_button_click(event) {
            
        }
    },
     
    mounted() {
        window.addEventListener('resize', this.onResize)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize)
    },
    data() {
        return {
            chart: Data,
            "onchart": {
                "legend": {
                    "display": true,
                    "position": "top",
                    "align": "center",
                    "labels": {
                        "usePointStyle": true
                    },
                    "type": "<EMA, SMA, Bollinger Bands, Volume>"
                }
            },
            width: window.innerWidth,
            height: window.innerHeight,
            colors: {
                colorBack: '#fff',
                colorGrid: '#eee',
                colorText: '#333',
            },
            toolbar : true,
            ext: Object.values(XP),
            overlays:   Object.values(Overlays),
            overlay_names: ['Default', ...Object.keys(Overlays)],
            mounted() {
                window.addEventListener('resize', this.onResize)
                window.DataCube = this.data
            },
            methods: {
                onResize(event) {
                    this.width = window.innerWidth
                    this.height = window.innerHeight
                },

                connectToBinance() {
                    const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1m');
                    ws.onmessage = (event) => {
                        const message = JSON.parse(event.data);
                        const kline = message.k;

                        const ohlcv = {
                            time: kline.t,
                            open: parseFloat(kline.o),
                            high: parseFloat(kline.h),
                            low: parseFloat(kline.l),
                            close: parseFloat(kline.c),
                            volume: parseFloat(kline.v)
                        };

                        this.updateChart(ohlcv);
                    };
                },
            },
            computed: {
                colors() {
                    return this.night ? {} : {
                        colorBack: '#fff',
                        colorGrid: '#eee',
                        colorText: '#333'
                    }
                },
            },
            beforeDestroy() {
                window.removeEventListener('resize', this.onResize)
            },
             
        }
    },
    // watch: {
    //     current(nv) {
    //         if (nv === 'Default') {
    //             this.$set(this, 'chart', new DataCube(Data))
    //             this.$refs.tvjs.resetChart()
    //             return
    //         }
    //         let origin = document.location.origin
    //         let path = `${origin}/src/overlays/${nv}/data.json`
    //         fetch(path).then(response => {
    //             return response.json()
    //         }).then(data => {
    //             this.$set(this, 'chart', new DataCube(data))
    //             this.$refs.tvjs.resetChart()
    //             window.data = data
    //             window.dc = this.chart
    //         }).catch(e => {
    //             console.log(e)
    //         })
    //     }
    // }
}
</script>
