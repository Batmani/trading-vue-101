<template>
    <div>
      <trading-vue
        :data="chart"
        :width="width"
        :height="height"
        ref="tvjs"
        title-txt="The King"
        :toolbar="true"
        :color-back="colors.colorBack"
        :color-grid="colors.colorGrid"
        :color-text="colors.colorText"
      ></trading-vue>
    </div>
  </template>
  
  <script>
  import { TradingVue, DataCube } from 'trading-vue-js';
  import Data from '../data/data_tools.json'; // Ensure this path is correct
  
  export default {
    name: 'Toolbar',
    description: 'Toolbar & drawing tools',
    props: ['night'],
    components: {
      TradingVue
    },
    data() {
      return {
        chart: new DataCube(Data),
        width: window.innerWidth,
        height: window.innerHeight - 50
      };
    },
    mounted() {
      window.addEventListener('resize', this.onResize);
      this.onResize();
      window.dc = this.chart;
      window.tv = this.$refs.tvjs;
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onResize);
    },
    methods: {
      onResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight - 50;
      }
    },
    computed: {
      colors() {
        return this.night
          ? {}
          : {
              colorBack: '#fff',
              colorGrid: '#eee',
              colorText: '#333'
            };
      }
    }
  };
  </script>
  
  <style>
  /* Add any additional styling here */
  </style>
  