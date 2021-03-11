
let chartOption = {
  getCarAmountChartOption: (carAmountChartData) => {
    return {
      title: {
        text: 'Desc of Car Amount for Each Gender'
      },
      tooltip: {},
      legend: {
        // data:['Amount of age groups by decade']
        data:[]
      },
      xAxis: {
        data: carAmountChartData.genderList
      },
      yAxis: {},
      series: [
        {
          name: 'Amount',
          type: 'bar',
          data: carAmountChartData.seriesData,
        }
      ],
        color: ['#50AFC0'],
    }
  },
  getGenderChartOption: (genderChartData) => {
    return {
      title: {
        text: 'Percentage of Each Gender'
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
          data: genderChartData,
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
  },
  getAgeCharOption: (ageChartData) => {
    return {
      title: {
        text: 'Age Chart (Show amount of age by decade)'
      },
      tooltip: {},
      legend: {
        // data:['Amount of age groups by decade']
        data:[]
      },
      xAxis: {
        data: ageChartData.xAxisData
      },
      yAxis: {},
      series: [
        {
          name: 'Amount',
          type: 'bar',
          data: ageChartData.seriesData,
        }
      ],
      color: ['#50AFC0'],
    }
  }
}


export default chartOption
