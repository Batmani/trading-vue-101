<template>
  <div class="multi-chart">
    <chartbox
      v-for="(timeframe, id) in charts"
      :key="id"
      :id="id"
      :tf="id"
      :data="timeframe"
      :width="cbox_width"
      :height="cbox_height"
      :night="night"
    ></chartbox>
  </div>
</template>

<script>
import Chartbox from './Chartbox.vue';
import Data from '../datafolder/data/data_tf.json'; // Ensure this path is correct
export default {
  name: 'Multichart',
  description: 'All charts must work correctly and independently',
  props: ['night'],
  components: {
    Chartbox
  },
  data() {
    return {
      charts: Data,
      width: window.innerWidth,
      height: window.innerHeight - 50
    };
  },
  computed: {
    cbox_width() {
      return Math.floor(this.width / 2 - 1);
    },
    cbox_height() {
      return Math.floor(this.height / 2 - 1);
    }
  },
  methods: {
    onResize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight - 50;
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  }
};
</script>

<style>
.multi-chart {
  display: grid;
  grid-template-columns: 50% 50%;
  height: 100%;
  gap: 1px; /* Adjust the gap between charts if needed */
}
</style>
