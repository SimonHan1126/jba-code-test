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
        this.processUserInfoList(this.$UserInfoList)
        this.initAgeRangeVariables()
        this.initCharts()
      },
      initCharts() {
        this.setAgeChartOption()
        this.setGenderChartOption()
        this.setCarAmountChartOption()
      },
      initAgeRangeVariables() {
        this.ageRangeStartArray = Object.keys(this.mapAgeToUserInfo)
        this.ageRangeEndArray = this.ageRangeStartArray
        this.ageRangeStart = this.ageRangeStartArray[0];
        this.ageRangeEnd = this.ageRangeEndArray[this.ageRangeEndArray.length - 1]

        this.updateUserInfoListByAgeRange()
      },
      processUserInfoList(userInfoList) {
        for (let i = 0; i < userInfoList.length; i++) {
          const userInfo = userInfoList[i]
          const age = userInfo.age || 0
          if (!this.mapAgeToUserInfo[age]) {
            this.mapAgeToUserInfo[age] = []
          }
          this.mapAgeToUserInfo[age].push(userInfo)
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
      getAgeChartData() {
        let mapChartData = {}
        for(let i = 0; i < this.userInfoList.length; i++) {
          let userInfo = this.userInfoList[i]
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
          if (!mapChartData[key]) {
            mapChartData[key] = []
          }
          mapChartData[key].push(userInfo)
        }
        let seriesData = []

        for (const key in mapChartData) {
          seriesData.push(mapChartData[key].length)
        }

        return {
          xAxisData : Object.keys(mapChartData),
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
      getGenderChartData() {
        let mapGenderToAmount = {}
        for(let i = 0; i < this.userInfoList.length; i++) {
          const userInfo = this.userInfoList[i]
          const gender = userInfo.gender || ""
          if (!mapGenderToAmount[gender]) {
            mapGenderToAmount[gender] = 1
          }
          mapGenderToAmount[gender]++
        }

        let seriesData = []
        for (const key in mapGenderToAmount) {
          seriesData.push({
            value : mapGenderToAmount[key],
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
      getCarAmountChartData() {
        let mapGenderToCarAmount = {}
        for(let i = 0; i < this.userInfoList.length; i++) {
          const userInfo = this.userInfoList[i]
          const gender = userInfo.gender || ""
          if (!mapGenderToCarAmount[gender]) {
            mapGenderToCarAmount[gender] = 1
          }
          mapGenderToCarAmount[gender]++
        }

        let listGenderToCarAmount = []
        for (const key in mapGenderToCarAmount) {
          listGenderToCarAmount.push({
            gender: key,
            amount: mapGenderToCarAmount[key]
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
          genderList : Object.keys(mapGenderToCarAmount),
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
      onAgeRangeStartChange() {
        this.updateUserInfoListByAgeRange()
        this.initCharts()
      },
      onAgeRangeEndChange() {
        this.updateUserInfoListByAgeRange()
        this.initCharts()
      },
      onDataTableClick(value) {
        alert('You clicked ' + value.name + ", " + value.gender + "," + value.age + " years old, have a/an " + value.car_make +", whose Email is " + value.email);
      }
    }
  }
</script>
