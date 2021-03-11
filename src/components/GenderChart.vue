<template>
  <div ref="refEcharts" class="simpleDemo"></div>
</template>

<script>

  export default {
    mounted() {
      console.log("GenderChart is here")
      let echarts = require('echarts');
      this.chart = echarts.init(this.$refs.refEcharts);
      this.chart.setOption(this.barOption);
    },
    data() {
      return {
        barOption: {
          group: 'User Data',
          title: {
            text: 'GenderChart',
          },
          legend: {
            show: true,
            align: 'left',
            bottom: true,
            textStyle: {
              color: '#000000',
            },
            orient: 'horizontal',
            data: [
              'Mobile',
              'Tablet',
              'Desktop',
            ],
          },
          tooltip: {
            trigger: 'item',
            position: 'right',
            axisPointer: {
              type: 'line'
            }
          },
          yAxis: {
            type: 'category',
            show: false
          },
          xAxis: {
            type: 'value',
            show: false,
          },
          series: [{
            label: {
              normal: {
                show: true,
                position: 'inside',
                fontSize: 12,
                // formatter: "{c}"
              },
            },
            type: 'bar',
            stack: 'stack',
            name: 'Mobile',
            barMaxWidth: '30px',
            data: [1000]
          },
            {
              type: 'bar',
              label: {
                normal: {
                  show: true,
                  position: 'inside',
                  fontSize: 12,
                  // formatter: "{c}"
                },
              },
              name: 'Tablet',
              stack: 'stack',
              barMaxWidth: '30px',
              data: [3000]
            },
            {
              type: 'bar',
              label: {
                normal: {
                  show: true,
                  position: 'inside',
                  fontSize: 12,
                  // formatter: "{c}"
                },
              },
              name: 'Desktop',
              stack: 'stack',
              barMaxWidth: '30px',
              data: [7000]
            }],
          animationDuration: 2000
        },
        initOptions: {
          renderer: 'canvas',
        },

      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .simpleDemo {
    width: 600px;
    height:400px;
    float: left;
    margin: 0 auto;
  }
</style>
