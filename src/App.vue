<template>
  <v-app>
    <v-main>
      <UserDisplay/>
    </v-main>
  </v-app>
</template>

<script>
import UserDisplay from './components/UserDisplay';

export default {
  name: 'App',
  components: {
    UserDisplay,
  },
};
</script>
