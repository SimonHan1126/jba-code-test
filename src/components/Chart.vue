<template>
  <v-container ref="refEcharts" class="chartStyle"></v-container>
</template>

<script>

  export default {
    mounted() {
      this.initChart()
    },
    methods: {
      initChart() {
        let echarts = require('echarts');
        this.chart = echarts.init(this.$refs.refEcharts);
      },
      setChartOption(option) {
        this.chart.setOption(option);
      }
    }
  }

</script>

<style scoped>
  .chartStyle {
    width: 1000px;
    height:400px;
  }
</style>

