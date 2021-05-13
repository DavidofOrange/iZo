import Vue from 'vue'
import * as VueGoogleMaps from "vue2-google-maps"
import App from './App.vue'
import store from "./store"
import { StripePlugin } from '@vue-stripe/vue-stripe';

Vue.config.productionTip = false

const stripeOptions = {
  // Find out how to use process.env here:
  pk: "pk_test_51IpsOpEiSsZuFva4rIiON7VZmi2EFplhfCluy1NOOn0xwiArvC0aF4QLQl2eof844GY0QD0f4c7ANKLtrzDQdXaK00pEOGpCm0"
};

Vue.use(StripePlugin, stripeOptions);

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
