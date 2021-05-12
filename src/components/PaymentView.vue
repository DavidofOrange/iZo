<template>
  <div>
    <stripe-element-card
      ref="elementRef"
      :pk="pulishableKey"
      @token="tokenCreated"
    />
    <button @click="submit">Generate token</button>
  </div>
</template>

<script>
import { StripeElementCard } from '@vue-stripe/vue-stripe';
export default {
    components: {
        StripeElementCard,
    },
    data () {
        // How to use process.env.STRIPE_PUBLISHABLE_KEY in Vue 2?
        this.pulishableKey = 'pk_test_51IpsOpEiSsZuFva4rIiON7VZmi2EFplhfCluy1NOOn0xwiArvC0aF4QLQl2eof844GY0QD0f4c7ANKLtrzDQdXaK00pEOGpCm0';
        return {
            token: null,
        };
    },

    method: {
        submit () {
            // this will trigger the process
            this.$refs.elementRef.submit();
        },
        
        tokenCreated (token) {
            console.log(token);
            // handle the token
            // send it to your server
        },
    }
};
</script>