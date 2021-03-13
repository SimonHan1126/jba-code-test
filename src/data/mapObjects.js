let mapObjects = {
  mapAgeToUserInfo: {},         // key: age, value: an array containing all the user information under the age in the key
  mapAgeChartData: {},          // data displayed in age chart
  mapGenderChartData: {},       // data displayed in gender chart
  mapCarAmountChartData: {},    // data displayed in car amount chart
  assembleMapAgeToUserInfoItem(userInfo) {
    const age = userInfo.age || 0
    if (!this.mapAgeToUserInfo[age]) {
      this.mapAgeToUserInfo[age] = []
    }
    this.mapAgeToUserInfo[age].push(userInfo)
  },
  assembleMapAgeChartDataItem(userInfo) {
    userInfo = userInfo || {}
    const age = userInfo.age || 0
    let divisor = Math.floor(age/10)
    let remainder = age % 10
    let key = ""
    if (remainder > 0) {
      key = (divisor * 10 + 1)  + "-" + ((divisor + 1) * 10)
    } else {
      if (divisor < 1) {
        key = "0-10"
      } else {
        key = ((divisor - 1) * 10 + 1) + "-" + divisor * 10
      }
    }
    if (!this.mapAgeChartData[key]) {
      this.mapAgeChartData[key] = []
    }
    this.mapAgeChartData[key].push(userInfo)
  },
  assembleMapGenderChartDataItem(userInfo) {
    userInfo = userInfo || {}
    const gender = userInfo.gender || ""
    if (!this.mapGenderChartData[gender]) {
      this.mapGenderChartData[gender] = 1
    }
    this.mapGenderChartData[gender]++
  },
  assembleMapCarAmountChartDataItem(userInfo) {
    userInfo = userInfo || {}
    const gender = userInfo.gender || ""
    if (!this.mapCarAmountChartData[gender]) {
      this.mapCarAmountChartData[gender] = 1
    }
    this.mapCarAmountChartData[gender]++
  },
  initializeMapData(userInfoList) {
    for (let i = 0; i < userInfoList.length; i++) {
      this.assembleMapAgeToUserInfoItem(userInfoList[i])
      this.assembleMapAgeChartDataItem(userInfoList[i])
      this.assembleMapGenderChartDataItem(userInfoList[i])
      this.assembleMapCarAmountChartDataItem(userInfoList[i])
    }
  },
  updateMapData(userInfoList) {
    this.mapAgeChartData = {}
    this.mapGenderChartData = {}
    this.mapCarAmountChartData = {}

    for (let i = 0; i < userInfoList.length; i++) {
      this.assembleMapAgeChartDataItem(userInfoList[i])
      this.assembleMapGenderChartDataItem(userInfoList[i])
      this.assembleMapCarAmountChartDataItem(userInfoList[i])
    }
  }
}


export default mapObjects
