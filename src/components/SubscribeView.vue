<template lang="">
    <div>
        <nav class="navbar navbar-light bg-light">
            <span class="navbar-brand mb-0 h1" @click.prevent="goHome">IZAKA-YA' OPEN</span>
            <span class="navbar-brand mb-0 h1">Business Account</span>
        </nav>
        <div class="hero-unit">
        <h1>iZO Premium Membership</h1><br/>
        <h5>Become a premium member today and expand your reach!</h5><br/><br/>
        <p>Information about our membership... Price, Features, Recurring Payments, etc...</p>
        <p>
            <a class="btn btn-primary btn-large" @click.prevent="subscribe">
            Subscribe
            </a>
        </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "SubscribeView",
    data() {
        return {

        }
    },

    methods: {
        goHome() {
            this.$store.commit("setShowsToFalse")
        },

        subscribe() {
            this.$store.dispatch("createSubscription")
            this.$store.commit("setShowsToFalse")
            this.$store.commit("setShowPaymentView")
        },
    }
}
</script>

<style lang="">
    
</style>