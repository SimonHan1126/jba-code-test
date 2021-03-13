<template>
  <v-app>
    <v-main>
      <UserInfoDisplayPage/>
    </v-main>
  </v-app>
</template>

<script>
import UserInfoDisplayPage from './views/UserInfoDisplayPage';

export default {
  name: 'App',
  components: {
    UserInfoDisplayPage,
  },
};
</script>
