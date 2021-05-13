<template lang="">
    <div>
        <nav class="navbar navbar-light bg-light">
            <span class="navbar-brand mb-0 h1" @click.prevent="goHome">IZAKA-YA' OPEN</span>
            <span class="navbar-brand mb-0 h1">Business Account</span>
        </nav>
        <div class="hero-unit">
        <h1>iZO Premium Membership</h1><br/>
        <h5>Become a premium member today and expand your reach!</h5><br/><br/>
        <p class="membership-info">The premium membership will allow you to include information on your businesses info window! 
            You will be able to effectively market yourself and, make your business stand out!
            <br/><br/><b>Reach more business for only 500yen/month!</b>
        </p>
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

<style>

.membership-info {
    margin: auto;
    width: 60vw;
}
    
</style>