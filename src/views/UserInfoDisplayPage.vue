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
  import usersInfo from "@/data/usersInfo";
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
    methods: {
      initialize() {
        this.initializeMapObjects()
        this.initializeAgeRangeVariables()
        this.initializeUserInfoTable()
        this.initializeCharts()
      },

      initializeAgeRangeVariables() {
        const allAgesArray = Object.keys(mapObjects.getMapAgeToUserInfo()) || []
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
        usersInfo.setUserInfoListByAgeRange(ageRangeStart, ageRangeEnd, mapObjects.getMapAgeToUserInfo())
      },
      setChartsData(){
        mapObjects.updateMapData(usersInfo.getUserInfoList())
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
        this.$refs.userInfoTable.setUserInfoList(usersInfo.getUserInfoList())
      },
      setAgeChartOption() {
        this.$refs.ageChart.setChartOption(chartOption.getAgeCharOption(chartData.getAgeChartData(mapObjects.getMapAgeChartData())))
      },
      setGenderChartOption() {
        this.$refs.genderChart.setChartOption(chartOption.getGenderChartOption(chartData.getGenderChartData(mapObjects.getMapGenderChartData())))
      },
      setCarAmountChartOption() {
        this.$refs.carAmountChart.setChartOption(chartOption.getCarAmountChartOption(chartData.getCarAmountChartData(mapObjects.getMapCarAmountChartData())))
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
