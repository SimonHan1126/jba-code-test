import Vue from 'vue'
import App from './App.vue'
import UserInfoList from "@/json/quiz.json"
import vuetify from './plugins/vuetify';

Vue.prototype.$UserInfoList = UserInfoList;

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
