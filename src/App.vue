<template>
  <div id="app" class="components-container">
    <AddBusiness v-if="this.$store.state.showAddBusiness" />
    <BusinessView v-if="this.$store.state.showBusinessView && this.$store.state.user.userType === 'Business'" />
    <SubscribeView v-if="this.$store.state.showSubscribeView && this.$store.state.user.userType === 'Business'" />
    <PaymentView v-if="this.$store.state.showPaymentView && this.$store.state.user.userType === 'Business'" />
    <CreateAccount v-if="this.$store.state.showCreateAccount" />
    <Login v-if="this.$store.state.showLogin" />
    <Navigation v-if="!this.$store.state.showLogin && !this.$store.state.showCreateAccount && !this.$store.state.showBusinessView && !this.$store.state.showAddBusiness && !this.$store.state.showSubscribeView && !this.$store.state.showPaymentView" />
    <Map v-if="!this.$store.state.showLogin && !this.$store.state.showCreateAccount && !this.$store.state.showBusinessView && !this.$store.state.showAddBusiness && !this.$store.state.showSubscribeView && !this.$store.state.showPaymentView" />
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
// import InfoBox from "./components/InfoBox";

export default {
  name: 'App',
  components: {
    Map,
    Navigation,
    Login,
    CreateAccount,
    // InfoBox,
    BusinessView,
    AddBusiness,
    SubscribeView,
    PaymentView
},

  beforeMount() {
    navigator.geolocation.getCurrentPosition((pos) => {
      const data = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      }
      this.$store.commit("setCenter", data)
    });
    this.$store.dispatch("getPlaces", this.$store.state.center)

  },

  methods: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
