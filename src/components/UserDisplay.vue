<template>
  <div>
    <v-card-title>Table</v-card-title>
    <v-container>
      <v-row justify="center" align="center">
        <v-col
          cols="1"
        >
          <v-card-text >Age:</v-card-text>
        </v-col>
        <v-col
          cols="5"
        >
          <v-container>
            <v-select
              v-model="ageRangeStart"
              :items="ageRangeStartArray"
              @change="onAgeRangeStartChange"
            />
          </v-container>
        </v-col>
        <v-col
          cols="1"
        >
          <v-card-text >to</v-card-text>
        </v-col>
        <v-col
          cols="5"
        >
          <v-container>
            <v-select
              v-model="ageRangeEnd"
              :items="ageRangeEndArray"
              @change="onAgeRangeEndChange"
            />
          </v-container>
        </v-col>
      </v-row>
    </v-container>
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
  import chartOption from "@/data/charts/chartOption";
  import chartData from "@/data/charts/chartData";
  export default {
    name: 'UserDisplay',
    components: {
      Chart,
      Table
    },
    mounted() {
      this.initialize()
    },
    data() {
      return {
        userInfoList: [], // this array contains information about all users in the age range selected in the page
        ageRangeStartArray: [], // Contains selectable age ranges, displayed in the first dropdown menu
        ageRangeEndArray: [], // Contains selectable age ranges, displayed in the first dropdown menu
        ageRangeStart: 0, // start of age range
        ageRangeEnd: 0, // end of age range
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
        this.ageRangeStartArray = Object.keys(this.mapAgeToUserInfo)
        this.ageRangeEndArray = this.ageRangeStartArray
        this.ageRangeStart = this.ageRangeStartArray[0];
        this.ageRangeEnd = this.ageRangeEndArray[this.ageRangeEndArray.length - 1]

        this.updateUserInfoListByAgeRange()
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

      updateUserInfoListByAgeRange() {
        if (this.ageRangeStart > this.ageRangeEnd) {
          const temp = this.ageRangeStart
          this.ageRangeStart = this.ageRangeEnd
          this.ageRangeEnd = temp
        }

        this.userInfoList = []
        for (let i = this.ageRangeStart; i <= this.ageRangeEnd; i++) {
          this.userInfoList = this.userInfoList.concat(this.mapAgeToUserInfo[i])
        }
      },
      updateChartsData(){
        this.mapAgeChartData = {}
        this.mapGenderChartData = {}
        this.mapCarAmountChartData = {}

        for (let i = 0; i < this.userInfoList.length; i++) {
          this.assembleMapAgeChartDataItem(this.userInfoList[i])
          this.assembleMapGenderChartDataItem(this.userInfoList[i])
          this.assembleMapCarAmountChartDataItem(this.userInfoList[i])
        }
      },
      updateTableAndChartsDataAfterAdjustAge() {
        this.updateUserInfoListByAgeRange()
        this.updateChartsData()
      },
      updateDataWhenAgeRangeChange() {
        this.updateTableAndChartsDataAfterAdjustAge()
        this.setDataToUserInfoTable()
        this.setDataToCharts()
      },

      setDataToCharts() {
        this.setAgeChartOption()
        this.setGenderChartOption()
        this.setCarAmountChartOption()
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

      onAgeRangeStartChange() {
        this.updateDataWhenAgeRangeChange()
      },
      onAgeRangeEndChange() {
        this.updateDataWhenAgeRangeChange()
      },
      onDataTableClick(value) {
        alert('You clicked ' + value.name + ", " + value.gender + "," + value.age + " years old, have a/an " + value.car_make +", whose Email is " + value.email);
      }
    }
  }
</script>
