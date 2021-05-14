<template lang="">
    <div>
        <nav class="navbar navbar-light">
            <div class="empty-div" @click="goHome">222222222</div>
            <span class="navbar-brand mb-0 h1">Business Account</span>
        </nav>
        <div class="hero-unit">
        <h1>iZO Premium Membership</h1><br/>
        <h5>Apologies, the payment failed...</h5><br/><br/>
        <p class="membership-info">Feel free to contact the iZO Group for any questions: support@izo.com
        </p>
        <p>
            <a class="btn btn-primary btn-large" @click.prevent="close">
            Close
            </a>
        </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "PaymentFailed",
    data() {
        return {

        }
    },

    methods: {
        goHome() {
            this.$store.commit("setShowsToFalse")
        },

        close() {
            this.$store.commit("setShowsToFalse")
            this.$store.commit("setShowBusinessView")
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