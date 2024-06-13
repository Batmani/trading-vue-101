<!-- <template>
    <div>
      <MainManiApp
        :data="chart"
        :width="width"
        :height="height"
        :legend-buttons="buttons"
        @legend-button-click="on_button_click"
        :color-back="colors.colorBack"
        :color-grid="colors.colorGrid"
        :color-text="colors.colorText"
        ref="tvjs"
      ></MainManiApp>
    </div>
  </template>
  
  <script>
  import Data from '../../data/data_buttons.json'; // Ensure this path is correct
  import CodeIcon from 'trading-vue-js'; // Ensure this path is correct
import MainManiApp from '.MainManiApp.vue';
  
  export default {
    name: 'LegendButtons',
    description: 'Legend buttons test (click the button, see console)',
    props: ['night'],
    components: {
      MainManiApp
    },
    data() {
      return {
        chart: Data,
        width: window.innerWidth,
        height: window.innerHeight - 50,
        buttons: [
          'display', 'settings', 'remove',
          {
            name: 'code',
            icon: CodeIcon
          }
        ]
      };
    },
    mounted() {
      window.addEventListener('resize', this.onResize);
      this.onResize();
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onResize);
    },
    methods: {
      onResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight - 50;
      },
      on_button_click(event) {
        if (event.button === 'display') {
          let d = this.chart[event.type][event.dataIndex];
          if (d) {
            if (!('display' in d.settings)) {
              this.$set(d.settings, 'display', true);
            }
            this.$set(d.settings, 'display', !d.settings.display);
          }
        }
        console.log(event);
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
   -->