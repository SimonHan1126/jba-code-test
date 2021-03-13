
let chartData = {
  getAgeChartData(mapAgeChartData) {
    let seriesData = []

    for (const key in mapAgeChartData) {
      seriesData.push(mapAgeChartData[key].length)
    }

    return {
      xAxisData : Object.keys(mapAgeChartData),
      seriesData : seriesData
    }
  },
  getGenderChartData(mapGenderChartData) {
    let seriesData = []
    for (const key in mapGenderChartData) {
      seriesData.push({
        value : mapGenderChartData[key],
        name : key
      })
    }

    return seriesData
  },
  getCarAmountChartData(mapCarAmountChartData) {
    let listGenderToCarAmount = []
    for (const key in mapCarAmountChartData) {
      listGenderToCarAmount.push({
        gender: key,
        amount: mapCarAmountChartData[key]
      })
    }

    listGenderToCarAmount.sort(function(a,b) {
      return b.amount - a.amount;
    })

    let genderList = []
    let seriesData = []

    for (let i = 0; i < listGenderToCarAmount.length; i++) {
      genderList.push(listGenderToCarAmount[i].gender)
      seriesData.push(listGenderToCarAmount[i].amount)
    }

    return {
      genderList : genderList,
      seriesData : seriesData
    }
  },
}


export default chartData
