<template>
    <!-- TradingVueJs 101 (example from 'Getting Started' ) -->
    
    <!-- <trading-vue :data="chart" 
      >
    </trading-vue>
    </template> -->

<!-- <script>
import { DataCube, TradingVue } from 'trading-vue-js'
 import Data from './data/data_grids.json'
import ManiDataStreamComponent from './components/ManiDataStreamComponent.vue';
export default {
    name: 'app',
    components: {
        TradingVue, ManiDataStreamComponent
    },
    methods: {
        onResize() {
            this.width = window.innerWidth
            this.height = window.innerHeight
        }
    },
    mounted() {
        window.addEventListener('resize', this.onResize)
        window.dc = this.chart
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize) 
    },
    data() {
        return {
            chart: new DataCube(Data),
            colors: {
                colorBack: '#fff',
                colorGrid: '#eee',
                colorText: '#333',
            }
        };
    }
};
</script>

<style>
html,
body {
    background-color: #000;
    margin: 0;
    padding: 0;
    overflow: hidden;
}
</style> -->