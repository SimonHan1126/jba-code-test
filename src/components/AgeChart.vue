<template>
  <div ref="refEcharts" class="simpleDemo"></div>
</template>

<script>

  export default {
    data() {
      return {
        chart: null,
        option:  {
          title: {
            text: 'Age Chart'
          },
          tooltip: {},
          legend: {
            data:['Amount']
          },
          xAxis: {
            data: ["AA","BB","CC","DD","EE","FF"]
          },
          yAxis: {},
          series: [
            {
              name: 'Amount',
              type: 'bar',
              data: [30, 20, 36, 40, 50, 60],
            }
          ],
          color: ['#66FF99'],
        }
      }
    },
    mounted() {
      console.log("AgeChart is here")
      this.getPage()
    },
    methods: {
      getPage() {
        let echarts = require('echarts');
        this.chart = echarts.init(this.$refs.refEcharts);
        this.chart.setOption(this.option);
      }
    }
  }
</script>

<style scoped>
  .simpleDemo {
    width: 600px;
    height:400px;
    float: left;
    margin: 0 auto;
  }
</style>
