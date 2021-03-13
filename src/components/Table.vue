<template>
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
</template>

<script>
  export default {
    name: "Table",
    data() {
      return {
        search: "",
        name: "",
        userInfoList: []
      }
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
      // this.$emit('goToProfilePage', "");
      setUserInfoList(list) {
        this.userInfoList = list
      },
      onDataTableClick(value) {
        this.$emit('onDataTableClick', value);
      }
    }
  }
</script>

<style scoped>

</style>
