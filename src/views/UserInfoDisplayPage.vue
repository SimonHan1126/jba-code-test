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
  import chartOption from "@/data/chartOption";
  import chartData from "@/data/chartData";
  import mapObjects from "@/data/mapObjects";
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
      };
    },
    methods: {
      initialize() {
        this.initializeMapObjects()
        this.initializeAgeRangeVariables()
        this.initializeUserInfoTable()
        this.initializeCharts()
      },

      initializeAgeRangeVariables() {
        const allAgesArray = Object.keys(mapObjects.mapAgeToUserInfo) || []
        this.setAgeRangeAdjustDropMenuContentData(allAgesArray)
        this.setUserInfoListByAgeRange(allAgesArray[0], allAgesArray[allAgesArray.length - 1])
      },
      initializeCharts() {
        this.setChartsOption()
      },
      initializeMapObjects() {
        mapObjects.initializeMapData(this.$UserInfoList)
      },
      initializeUserInfoTable() {
        this.setDataToUserInfoTable()
      },

      updateDataWhenAgeRangeChange(ageRangeInfoObject) {
        const ageRangeStart = ageRangeInfoObject.ageRangeStart
        const ageRangeEnd = ageRangeInfoObject.ageRangeEnd
        this.setUserInfoListByAgeRange(ageRangeStart, ageRangeEnd)
        this.setDataToUserInfoTable()
        this.setChartsData()
        this.setChartsOption()
      },

      setUserInfoListByAgeRange(ageRangeStart, ageRangeEnd) {
        this.userInfoList = []
        for (let i = ageRangeStart; i <= ageRangeEnd; i++) {
          this.userInfoList = this.userInfoList.concat(mapObjects.mapAgeToUserInfo[i])
        }
      },
      setChartsData(){
        mapObjects.updateMapData(this.userInfoList)
      },
      setChartsOption() {
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
        this.$refs.ageChart.setChartOption(chartOption.getAgeCharOption(chartData.getAgeChartData(mapObjects.mapAgeChartData)))
      },
      setGenderChartOption() {
        this.$refs.genderChart.setChartOption(chartOption.getGenderChartOption(chartData.getGenderChartData(mapObjects.mapGenderChartData)))
      },
      setCarAmountChartOption() {
        this.$refs.carAmountChart.setChartOption(chartOption.getCarAmountChartOption(chartData.getCarAmountChartData(mapObjects.mapCarAmountChartData)))
      },

      onAgeRangeStartChange(value) {
        this.updateDataWhenAgeRangeChange(value)
      },
      onAgeRangeEndChange(value) {
        this.updateDataWhenAgeRangeChange(value)
      },
      onDataTableClick(value) {
        alert('You clicked ' + value.name + ", " + value.gender + "," + value.age + " years old, have a/an " + value.car_make +", whose Email is " + value.email);
      }
    }
  }
</script>
