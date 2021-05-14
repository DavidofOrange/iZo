<template>
    <div>
        <nav class="navbar">
            <div class="empty-div">222222222</div>
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
            color: 'grey',
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
                this.$store.commit("setShowPaymentFailed")
            }

        } catch (err) {
            // handle payment error here
            console.log(err);
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
    width: 90%;
    margin-top: 5vh;
    margin-left: auto;
    margin-right: auto;
    padding: 5vh;
    border-radius: 20px;
    border: 1px solid;
    background-color: rgb(235, 235, 235);
}

label {
    color: black;
}

.card-input {
    border: 1px solid rgb(124, 124, 124);
    margin: auto;
    height: 30px;
    font-size: 2rem;
}


#custom-button {
    margin-top: 3vh;
    height: 30px;
    border-radius: 10px;
    background-color: tomato;
    color: rgb(255, 255, 255);
}

#card-error {
  color: red;
}
</style>