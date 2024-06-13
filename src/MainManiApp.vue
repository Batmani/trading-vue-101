<template>
  <!-- Main component  -->
  <div class="Main-ManiApp" v-bind:id="id"
      @mousedown="mousedown" @mouseleave="mouseleave"
       :style="{
          color: this.chart_props.colors.text,
          font: this.font_comp,
          width: this.width+'px',
          height: this.height+'px'}">
      <toolbar v-if="toolbar"
          ref="toolbar"
          v-on:custom-event="custom_event"
          v-bind="chart_props"
          v-bind:config="chart_config">
      </toolbar>
      <widgets v-if="controllers.length"
          ref="widgets"
          :map="ws" :width="width" :height="height"
          :tv="this" :dc="data">
      </widgets>
      <chart :key="reset"
          ref="chart"
          v-bind="chart_props"
          v-bind:tv_id="id"
          v-bind:config="chart_config"
          v-on:custom-event="custom_event"
          v-on:range-changed="range_changed"
          v-on:legend-button-click="legend_button">
      </chart>
      <transition name="tvjs-drift">
          <the-tip :data="tip" v-if="tip"
              @remove-me="tip = null"/>
      </transition>
  </div>
</template>

<script>
import { Chart, DataCube, Sidebar, MultiChart } from 'trading-vue-js';
import TfSelector from 'trading-vue-js';
import Utils from './DataHelper/utils.js';
import Const from './DataHelper/constants.js';
import Stream from './DataHelper/stream.js';
import Overlays from 'tvjs-overlays';
import data_spx from './data/data_spx.json'; // Import the local JSON data

export default {
  name: 'app',
    components: { TradingVue },
    methods: {
        onResize(event) {
            this.width = window.innerWidth
            this.height = window.innerHeight
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
            width: window.innerWidth,
            height: window.innerHeight,
            colors: {
                colorBack: '#fff',
                colorGrid: '#eee',
                colorText: '#333',
            }
        }
    }
};
</script>

<style>
/* Add any additional styling here */
</style>
