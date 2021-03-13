<template>
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
</template>

<script>
  export default {
    name: "AgeRangeAdjust",
    data: function () {
      return {
        ageRangeStartArray: [], // Contains selectable age ranges, displayed in the first dropdown menu
        ageRangeEndArray: [], // Contains selectable age ranges, displayed in the first dropdown menu
        ageRangeStart: 0, // start of age range
        ageRangeEnd: 0, // end of age range
      }
    },
    methods: {
      setAgeRangeStartVariables(array) {
        array = array || []
        this.ageRangeStartArray = array
        this.ageRangeStart = array[0]
      },
      setAgeRangeEndVariables(array) {
        array = array || []
        this.ageRangeEndArray = array
        this.ageRangeEnd = array[array.length - 1]
      },
      onAgeRangeStartChange(value) {
        value = value || 0
        if (this.ageRangeEnd < value) {
          this.ageRangeStart = this.ageRangeEnd
          this.ageRangeEnd = value
        }
        this.$emit('onAgeRangeStartChange', {
          ageRangeStart : this.ageRangeStart,
          ageRangeEnd : this.ageRangeEnd,
        });
      },
      onAgeRangeEndChange(value) {
        value = value || 0
        if (this.ageRangeStart > value) {
          this.ageRangeEnd = this.ageRangeStart
          this.ageRangeStart = value
        }
        this.$emit('onAgeRangeEndChange', {
          ageRangeStart : this.ageRangeStart,
          ageRangeEnd : this.ageRangeEnd,
        });
      }
    }
  }
</script>

<style scoped>

</style>
