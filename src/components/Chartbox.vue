<template>
    <div>
      <trading-vue
        :data="chartData"
        :width="width"
        :height="height"
        ref="tvjs"
        :color-back="colors.colorBack"
        :color-grid="colors.colorGrid"
        :color-text="colors.colorText"
        :toolbar="true"
      ></trading-vue>
    </div>
  </template>
  
  <script>
  import TradingVue from 'trading-vue-js';
  import 'trading-vue-js/dist/trading-vue.css';
  import DataCube from 'trading-vue-js/dist/helpers/datacube.js';
  
  export default {
    name: 'Chartbox',
    props: {
      data: Object,
      width: Number,
      height: Number,
      night: Boolean
    },
    data() {
      return {
        chartData: new DataCube(this.data)
      };
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
  