<template>
  <div>
    <v-divider/>
    <div ref="refEcharts" class="chartStyle"></div>
  </div>
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
    float: left;
    margin: 0 auto;
  }
</style>

