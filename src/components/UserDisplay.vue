<template>
  <div>
    <v-card-title>Table</v-card-title>
    <AgeRangeAdjust
      ref="ageRangeAdjust"
      @onAgeRangeStartChange="onAgeRangeStartChange"
      @onAgeRangeEndChange="onAgeRangeEndChange"
    />
    <v-divider/>
    <Table ref="userInfoTable" @onDataTableClick="onDataTableClick"/>
    <v-divider/>
    <v-card-title>Charts</v-card-title>
    <v-container>
      <chart ref="ageChart"/>
      <chart ref="genderChart"/>
      <chart ref="carAmountChart"/>
      <v-divider/>
    </v-container>
  </div>
</template>

<script>
  import Chart from "@/components/Chart";
  import Table from "@/components/Table";
  import AgeRangeAdjust from "@/components/AgeRangeAdjust";
  import chartOption from "@/data/charts/chartOption";
  import chartData from "@/data/charts/chartData";
  export default {
    name: 'UserDisplay',
    components: {
      Chart,
      Table,
      AgeRangeAdjust
    },
    mounted() {
      this.initialize()
    },
    data() {
      return {
        userInfoList: [], // this array contains information about all users in the age range selected in the page
        mapAgeToUserInfo: {}, // key: age, value: an array containing all the user information under the age in the key
        mapAgeChartData: {}, // data displayed in age chart
        mapGenderChartData: {}, // data displayed in gender chart
        mapCarAmountChartData: {} // data displayed in car amount chart
      };
    },

    methods: {
      initialize() {
        this.initializeMapObjects(this.$UserInfoList)
        this.initializeAgeRangeVariables()
        this.initializeUserInfoTable()
        this.initializeCharts()
      },

      initializeAgeRangeVariables() {
        const allAgesArray = Object.keys(this.mapAgeToUserInfo) || []
        this.setAgeRangeAdjustDropMenuContentData(allAgesArray)
        this.setUserInfoListByAgeRange(allAgesArray[0], allAgesArray[allAgesArray.length - 1])
      },
      initializeCharts() {
        this.setDataToCharts()
      },
      initializeMapObjects(userInfoList) {
        for (let i = 0; i < userInfoList.length; i++) {
          this.assembleMapAgeToUserInfoItem(userInfoList[i])
          this.assembleMapAgeChartDataItem(userInfoList[i])
          this.assembleMapGenderChartDataItem(userInfoList[i])
          this.assembleMapCarAmountChartDataItem(userInfoList[i])
        }
      },
      initializeUserInfoTable() {
        this.setDataToUserInfoTable()
      },

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

      updateDataWhenAgeRangeChange(ageRangeInfoObject) {
        const ageRangeStart = ageRangeInfoObject.ageRangeStart
        const ageRangeEnd = ageRangeInfoObject.ageRangeEnd
        this.setUserInfoListByAgeRange(ageRangeStart, ageRangeEnd)
        this.setChartsData()
        this.setDataToUserInfoTable()
        this.setDataToCharts()
      },

      setUserInfoListByAgeRange(ageRangeStart, ageRangeEnd) {
        this.userInfoList = []
        for (let i = ageRangeStart; i <= ageRangeEnd; i++) {
          this.userInfoList = this.userInfoList.concat(this.mapAgeToUserInfo[i])
        }
      },
      setChartsData(){
        this.mapAgeChartData = {}
        this.mapGenderChartData = {}
        this.mapCarAmountChartData = {}

        for (let i = 0; i < this.userInfoList.length; i++) {
          this.assembleMapAgeChartDataItem(this.userInfoList[i])
          this.assembleMapGenderChartDataItem(this.userInfoList[i])
          this.assembleMapCarAmountChartDataItem(this.userInfoList[i])
        }
      },
      setDataToCharts() {
        this.setAgeChartOption()
        this.setGenderChartOption()
        this.setCarAmountChartOption()
      },
      setAgeRangeAdjustDropMenuContentData(allAgesArray) {
        this.$refs.ageRangeAdjust.setAgeRangeStartVariables(allAgesArray)
        this.$refs.ageRangeAdjust.setAgeRangeEndVariables(allAgesArray)
      },
      setDataToUserInfoTable() {
        this.$refs.userInfoTable.setUserInfoList(this.userInfoList)
      },
      setAgeChartOption() {
        this.$refs.ageChart.setChartOption(chartOption.getAgeCharOption(chartData.getAgeChartData(this.mapAgeChartData)))
      },
      setGenderChartOption() {
        this.$refs.genderChart.setChartOption(chartOption.getGenderChartOption(chartData.getGenderChartData(this.mapGenderChartData)))
      },
      setCarAmountChartOption() {
        this.$refs.carAmountChart.setChartOption(chartOption.getCarAmountChartOption(chartData.getCarAmountChartData(this.mapCarAmountChartData)))
      },

      onAgeRangeStartChange(value) {
        console.log("onAgeRangeStartChange value " + JSON.stringify(value))
        this.updateDataWhenAgeRangeChange(value)
      },
      onAgeRangeEndChange(value) {
        console.log("onAgeRangeEndChange value " + JSON.stringify(value))
        this.updateDataWhenAgeRangeChange(value)
      },
      onDataTableClick(value) {
        alert('You clicked ' + value.name + ", " + value.gender + "," + value.age + " years old, have a/an " + value.car_make +", whose Email is " + value.email);
      }
    }
  }
</script>
