<template>
    <!-- Timeframe Selector -->
    <div class="tf-selector">
      <span
        class="timeframe"
        v-for="(tf, i) in timeframes"
        :key="i"
        @click="onClick(tf, i)"
        :style="selected === i ? { color: '#44c767' } : {}"
      >
        {{ tf }}
      </span>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TfSelector',
    props: ['charts'],
    mounted() {
      this.$emit('selected', {
        name: this.timeframes[this.selected],
        i: this.selected
      });
    },
    computed: {
      timeframes() {
        return Object.keys(this.charts);
      }
    },
    methods: {
      onClick(tf, i) {
        this.selected = i;
        this.$emit('selected', {
          name: this.timeframes[this.selected],
          i: this.selected
        });
      }
    },
    data() {
      return {
        selected: 0
      };
    }
  };
  </script>
  
  <style>
  .tf-selector {
    position: absolute;
    top: 15px;
    right: 80px;
    font: 16px -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    background: #34363b;
    color: #ccc;
    padding: 8px;
    border-radius: 3px;
  }
  .timeframe {
    margin-right: 5px;
    user-select: none;
    cursor: pointer;
    font-weight: 200;
  }
  .timeframe:hover {
    color: #fff;
  }
  </style>
  