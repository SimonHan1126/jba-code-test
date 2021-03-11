<template>
  <div>
    <v-card-title>Table</v-card-title>
    <v-container>
      <v-row justify="center" align="center">
        <v-col
          cols="1"
        >
          <v-card-text font-size="18px">Age:</v-card-text>
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
          <v-card-text font-size="18px">to</v-card-text>
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
      >
      </v-data-table>
    </v-container>
    <v-container>
      <v-divider/>
      <v-card-title>Charts</v-card-title>
      <v-divider/>
      <AgeChart/>
      <v-divider/>
      <GenderChart/>
      <v-divider/>
      <CarAmountChart/>
      <v-divider/>
    </v-container>
  </div>
</template>

<script>
  import AgeChart from "@/components/AgeChart";
  import GenderChart from "@/components/GenderChart";
  import CarAmountChart from "@/components/CarAmountChart";
  export default {
    name: 'UserDisplay',
    components: {
      AgeChart,
      GenderChart,
      CarAmountChart
    },
    mounted() {
      this.init()
    },
    data() {
      return {
        search: "",
        name: "",
        userInfoList: this.$UserInfoList,
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
        this.initAgeRange()
      },
      initAgeRange() {
        this.ageRangeStartArray = Object.keys(this.mapAgeToUserInfo)
        this.ageRangeEndArray = this.ageRangeStartArray
        this.ageRangeStart = this.ageRangeStartArray[0];
        this.ageRangeEnd = this.ageRangeEndArray[this.ageRangeEndArray.length - 1]
      },
      processUserInfoList(userInfoList) {
        for (let i = 0; i < userInfoList.length; i++) {
          const userInfo = userInfoList[i]
          const age = userInfo.age
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
      onAgeRangeStartChange() {
        this.updateUserInfoListByAgeRange()
      },
      onAgeRangeEndChange() {
        this.updateUserInfoListByAgeRange()
      }
    }
  }
</script>
