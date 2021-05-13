<template>
    <div>
        <nav class="navbar navbar-light bg-light">
            <span class="navbar-brand mb-0 h1" @click.prevent="goHome">IZAKA-YA' OPEN</span>
            <span class="navbar-brand mb-0 h1">Business Account</span>
        </nav>
        <div class="hero-unit">
        <h1>iZO Premium Membership</h1><br/>
        </div>
        <div class="payment-container">
            <label>Card Number</label>
            <div id="card-number" class="card-input"></div>
            <label>Card Expiry</label>
            <div id="card-expiry" class="card-input"></div>
            <label>Card CVC</label>
            <div id="card-cvc" class="card-input"></div>
            <div id="card-error"></div>
            <button id="custom-button" @click="createToken">Process Payment</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "PaymentView",

    data() {
        return {
            token: null,
            cardNumber: null,
            cardExpiry: null,
            cardCvc: null
        }
    },

    computed: {
        stripeElements () {
            return this.$stripe.elements();
        }
    },

    mounted () {
        // Style Object documentation here: https://stripe.com/docs/js/appendix/style
        const style = {
        base: {
            color: 'black',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '14px',
            '::placeholder': {
            color: '#aab7c4',
            },
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a',
        },
        };
        this.cardNumber = this.stripeElements.create('cardNumber', { style });
        this.cardNumber.mount('#card-number');
        this.cardExpiry = this.stripeElements.create('cardExpiry', { style });
        this.cardExpiry.mount('#card-expiry');
        this.cardCvc = this.stripeElements.create('cardCvc', { style });
        this.cardCvc.mount('#card-cvc');
    },

    beforeDestroy () {
        this.cardNumber.destroy();
        this.cardExpiry.destroy();
        this.cardCvc.destroy();
    },

    methods: {
      async createToken () {
        const { token, error } = await this.$stripe.createToken(this.cardNumber);
        if (error) {
            // handle error here
            document.getElementById('card-error').innerHTML = error.message;
            return;
        }
        
        try {
            const res = await this.$stripe.confirmCardPayment(this.$store.state.subscription.stripeClientSecret, {
                payment_method: {
                    card: this.cardNumber,
                }
            })

            if (res.paymentIntent.status === "succeeded") {
                console.log("Payment successful")
                this.$store.dispatch("subscribeBusiness")
            } else {
                console.log("Payment failed...")
            }

        } catch (err) {
            // handle payment error here
            console.log("HERE", err);
        }
    },

    goHome() {
            this.$store.commit("setShowsToFalse")
        },
  }
};
</script>

<style scoped>
.payment-container {
    margin-top: 15vh;
    margin-left: 20vw;
    margin-right: 20vw;
    padding: 5vh;
    border-radius: 20px;
    border: 1px solid;
    background-color: rgb(235, 235, 235);
}

.card-input {
    border: 1px solid rgb(180, 180, 180);
    margin: auto;
}

#custom-button {
    margin-top: 3vh;
    height: 30px;
    border-radius: 10px;
    background-color: rgb(53, 125, 219);
    color: white;
}

#card-error {
  color: red;
}
</style>