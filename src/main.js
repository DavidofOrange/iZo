import Vue from 'vue'
import * as VueGoogleMaps from "vue2-google-maps"
import App from './App.vue'
import store from "./store"


Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBN_Xp-EDhMj_SmTAppedBb4o4KFd6uj5E",
    libraries: "geometry,places,drawing",
  },
});

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
