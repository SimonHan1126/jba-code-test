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
    <v-container>
      <v-data-table
        dense
        :headers="headers"
        :items="userInfoList"
        item-key="name"
        :search="search"
        @click:row="onDataTableClick"
      >
      </v-data-table>
    </v-container>
    <v-container>
      <v-divider/>
      <v-card-title>Charts</v-card-title>
      <chart ref="ageChart"/>
      <chart ref="genderChart"/>
      <chart ref="carAmountChart"/>
      <v-divider/>
    </v-container>
  </div>
</template>

<script>
  import Chart from "@/components/Chart";
  export default {
    name: 'UserDisplay',
    components: {
      Chart
    },
    mounted() {
      this.init()
    },
    data() {
      return {
        search: "",
        name: "",
        userInfoList: [],
        ageRangeStartArray: [],
        ageRangeEndArray: [],
        ageRangeStart: null,
        ageRangeEnd: null,
        mapAgeToUserInfo: {},
        mapAgeChartData: {},
        mapGenderChartData: {},
        mapCarAmountChartData: {}
      };
    },
    computed: {
      headers() {
        return [
          {
            text: "Age",
            value: "age",
          },
          {
            text: "Gender",
            value: "gender",
          },
          {
            text: "Name",
            value: "name",
            sortable: false,
          },
          {
            text: "Car Make",
            value: "car_make",
          }
        ];
      }
    },
    methods: {
      init() {
        this.initMapObjects(this.$UserInfoList)
        this.initAgeRangeVariables()
        this.initCharts()
      },
      initAgeRangeVariables() {
        this.ageRangeStartArray = Object.keys(this.mapAgeToUserInfo)
        this.ageRangeEndArray = this.ageRangeStartArray
        this.ageRangeStart = this.ageRangeStartArray[0];
        this.ageRangeEnd = this.ageRangeEndArray[this.ageRangeEndArray.length - 1]

        this.updateUserInfoListByAgeRange()
      },
      initCharts() {
        this.setAgeChartOption()
        this.setGenderChartOption()
        this.setCarAmountChartOption()
      },
      assembleMapAgeToUserInfoItem(userInfo) {
        const age = userInfo.age || 0
        if (!this.mapAgeToUserInfo[age]) {
          this.mapAgeToUserInfo[age] = []
        }
        this.mapAgeToUserInfo[age].push(userInfo)
      },
      initMapObjects(userInfoList) {
        for (let i = 0; i < userInfoList.length; i++) {
          this.assembleMapAgeToUserInfoItem(userInfoList[i])
          this.assembleMapAgeChartDataItem(userInfoList[i])
          this.assembleMapGenderChartDataItem(userInfoList[i])
          this.assembleMapCarAmountChartDataItem(userInfoList[i])
        }
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
      getAgeChartData() {
        let seriesData = []

        for (const key in this.mapAgeChartData) {
          seriesData.push(this.mapAgeChartData[key].length)
        }

        return {
          xAxisData : Object.keys(this.mapAgeChartData),
          seriesData : seriesData
        }
      },
      setAgeChartOption() {
        let charData = this.getAgeChartData()
        this.$refs.ageChart.setChartOption({
          title: {
            text: 'Age Chart (Show amount of age by decade)'
          },
          tooltip: {},
          legend: {
            // data:['Amount of age groups by decade']
            data:[]
          },
          xAxis: {
            data: charData.xAxisData
          },
          yAxis: {},
          series: [
            {
              name: 'Amount',
              type: 'bar',
              data: charData.seriesData,
            }
          ],
          color: ['#50AFC0'],
        })
      },
      assembleMapGenderChartDataItem(userInfo) {
        userInfo = userInfo || {}
        const gender = userInfo.gender || ""
        if (!this.mapGenderChartData[gender]) {
          this.mapGenderChartData[gender] = 1
        }
        this.mapGenderChartData[gender]++
      },
      getGenderChartData() {
        let seriesData = []
        for (const key in this.mapGenderChartData) {
          seriesData.push({
            value : this.mapGenderChartData[key],
            name : key
          })
        }

        return seriesData
      },
      setGenderChartOption() {
        this.$refs.genderChart.setChartOption({
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
              data: this.getGenderChartData(),
              itemStyle: {
                emphasis: {
                  shadowBlur: 15,
                  shadowOffsetX: 0,
                  shadowColor: "rgba (0, 0, 0, 0.1)"
                }
              }
            }
          ]
        })
      },
      assembleMapCarAmountChartDataItem(userInfo) {
        userInfo = userInfo || {}
        const gender = userInfo.gender || ""
        if (!this.mapCarAmountChartData[gender]) {
          this.mapCarAmountChartData[gender] = 1
        }
        this.mapCarAmountChartData[gender]++
      },
      getCarAmountChartData() {
        let listGenderToCarAmount = []
        for (const key in this.mapCarAmountChartData) {
          listGenderToCarAmount.push({
            gender: key,
            amount: this.mapCarAmountChartData[key]
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
      setCarAmountChartOption() {
        const carAmountChartData = this.getCarAmountChartData()
        this.$refs.carAmountChart.setChartOption({
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
        })
      },
      updateCharData(){
        this.mapAgeChartData = {}
        this.mapGenderChartData = {}
        this.mapCarAmountChartData = {}

        for (let i = 0; i < this.userInfoList.length; i++) {
          this.assembleMapAgeChartDataItem(this.userInfoList[i])
          this.assembleMapGenderChartDataItem(this.userInfoList[i])
          this.assembleMapCarAmountChartDataItem(this.userInfoList[i])
        }
      },
      updateTableAndChartsAfterAdjustAge() {
        this.updateUserInfoListByAgeRange()
        this.updateCharData()
        this.initCharts()
      },
      onAgeRangeStartChange() {
        this.updateTableAndChartsAfterAdjustAge()
      },
      onAgeRangeEndChange() {
        this.updateTableAndChartsAfterAdjustAge()
      },
      onDataTableClick(value) {
        alert('You clicked ' + value.name + ", " + value.gender + "," + value.age + " years old, have a/an " + value.car_make +", whose Email is " + value.email);
      }
    }
  }
</script>
