<template>
  <v-container>
    <div id="app">
      <v-app id="inspire">
        <template>
          <div>Table</div>
          <v-divider/>
          <div>
            <v-data-table
              dense
              :headers="headers"
              :items="userInfoList"
              item-key="name"
              class="elevation-1"
              :search="search"
            >
            </v-data-table>
          </div>
          <v-divider/>
          <div></div>
          <v-divider/>
            <AgeChart/>
            <GenderChart/>
            <CarAmountChart/>
          <v-divider/>
        </template>
      </v-app>
    </div>
  </v-container>
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
        calories: "",
        fat: "",
        carbs: "",
        userInfoList: this.$UserInfoList
      };
    },
    computed: {
      headers() {
        return [
          {
            text: "Age",
            // align: "left",
            // sortable: false,
            value: "age",
            // filter: f => { return ( f + '' ).toLowerCase().includes( this[ 'name' ].toLowerCase() ) }
          },
          {
            text: "Gender",
            value: "gender",
            // filter: value => {
            //   if (!this.calories) return true;
            //   return value < parseInt(this.calories);
            // }
          },
          {
            text: "Name",
            value: "name",
            // filter: value => {
            //   if (!this.fat) return true;
            //   return value < parseInt(this.fat);
            // }
          },
          {
            text: "Car Make",
            value: "car_make",
            // filter: value => {
            //   if (!this.carbs) return true;
            //   return value == parseInt(this.carbs);
            // }
          }
        ];
      }
    },
    methods: {
      init() {
        // console.log("UserInfoList " + JSON.stringify(this.$UserInfoList))
      }
    }
  }
</script>
