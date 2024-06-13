<template>
    <div>
      <MainManiApp
        :data="chartData"
        :width="width"
        :height="height"
        ref="tvjs"
        :color-back="colors.colorBack"
        :color-grid="colors.colorGrid"
        :color-text="colors.colorText"
        :toolbar="true"
      ></MainManiApp>
    </div>
  </template>
  
  <script>
  import { DataCube} from 'trading-vue-js';

  
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
  