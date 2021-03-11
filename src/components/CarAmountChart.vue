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
            text: 'CarAmountChart'
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br /> {b}: {c} ({d}%)"
          },
          series: [
            {
              name: "access source",
              type: "pie",
              radius: "60%",
              center: ["50%", "50%"],
              data: [
                { value: 335, name: "direct access" },
                { value: 310, name: "mail marketing" },
                { value: 234, name: "affiliate ad" },
                { value: 135, name: "video ad" },
                { value: 1548, name: "search engine" }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 15,
                  shadowOffsetX: 0,
                  shadowColor: "rgba (0, 0, 0, 0.1)"
                }
              }
            }
          ]
        }
      }
    },
    mounted() {
      console.log("CarAmountChart is here")
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
