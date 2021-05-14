<template>
  <div id="app" class="components-container">
    <Features v-if="this.$store.state.showFeatures && this.$store.state.user.userType === 'Business'" />
    <AddBusiness v-if="this.$store.state.showAddBusiness" />
    <BusinessView v-if="this.$store.state.showBusinessView && this.$store.state.user.userType === 'Business'" />
    <SubscribeView v-if="this.$store.state.showSubscribeView && this.$store.state.user.userType === 'Business'" />
    <PaymentView v-if="this.$store.state.showPaymentView && this.$store.state.user.userType === 'Business'" />
    <PaymentSuccess v-if="this.$store.state.showPaymentSuccess && this.$store.state.user.userType === 'Business'" />
    <PaymentFailed v-if="this.$store.state.showPaymentFailed && this.$store.state.user.userType === 'Business'" />
    <CreateAccount v-if="this.$store.state.showCreateAccount" />
    <Login v-if="this.$store.state.showLogin" />
    <Navigation v-if="!this.$store.state.showLogin && !this.$store.state.showCreateAccount && !this.$store.state.showBusinessView && !this.$store.state.showAddBusiness && !this.$store.state.showSubscribeView && !this.$store.state.showPaymentView && !this.$store.state.showFeatures && !this.$store.state.showPaymentSuccess && !this.$store.state.showPaymentFailed" />
    <Map v-if="!this.$store.state.showLogin && !this.$store.state.showCreateAccount && !this.$store.state.showBusinessView && !this.$store.state.showAddBusiness && !this.$store.state.showSubscribeView && !this.$store.state.showPaymentView && !this.$store.state.showFeatures && !this.$store.state.showPaymentSuccess && !this.$store.state.showPaymentFailed" />
  </div>
</template>

<script>
import BusinessView from "./components/BusinessView"
import Map from "./components/Map"
import Navigation from "./components/Navigation"
import Login from "./components/Login"
import CreateAccount from "./components/CreateAccount"
import AddBusiness from "./components/AddBusiness"
import SubscribeView from "./components/SubscribeView"
import PaymentView from "./components/PaymentView"
import PaymentSuccess from "./components/PaymentSuccess"
import PaymentFailed from "./components/PaymentFailed"
import Features from "./components/Features"

export default {
  name: 'App',
  components: {
    Map,
    Navigation,
    Login,
    CreateAccount,
    BusinessView,
    AddBusiness,
    SubscribeView,
    PaymentView,
    PaymentSuccess,
    PaymentFailed,
    Features
},

  beforeMount() {
    navigator.geolocation.getCurrentPosition((pos) => {
      // const data = {
      //   lat: pos.coords.latitude,
      //   lng: pos.coords.longitude
      // }
      
      const data = {
        lat: 35.70545018149081,
        lng: 139.69784325507567
      }

      this.$store.commit("setCenter", data)
    });
    this.$store.dispatch("getPlaces", this.$store.state.center)

  },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
}
body {
  background-color: rgb(43, 43, 43);
  background-image: url("./assets/iZO.png");
  background-repeat: no-repeat;
  background-size: 100px;
}

.components-container {
  display:flex;
  flex-direction: column;
}

.spinner-border {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 99;
}
</style>
