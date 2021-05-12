const db = require('../db/db');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


class StripeController {
    
    async createCustomer(req, res) {
        try {
            const { id, email } = req.body;
            const stripe_customer = await stripe.customers.create({
              email: email,
            });
    
            const [ stripeId ] = await db('users')
                .where({id: id})
                .update({stripe_id: stripe_customer.id})
                .returning('stripe_id');
            
            res.send({stripeId});
        } catch (err) {
            console.log(err);
            res.status(400).end();
        }
    }
    
	async createSubscription(req, res) {
		try {
			const { stripeId, userId, busId } = req.body;
			const stripeSub = await stripe.subscriptions.create({
				customer: stripeId,
				items: [
					{ price: process.env.STRIPE_PREMIUM_PRICE_ID }
				],
				payment_behavior: 'default_incomplete',
                expand: ['latest_invoice.payment_intent'],
			});
            
			const subscription = {
				id: stripeSub.id,
				user_id: userId,
				bus_id: busId,
				status: 'incomplete'
			}

			await db('subscriptions').insert(subscription);

			res.send({
				stripeSubId: stripeSub.id,
				stripeClientSecret: stripeSub.latest_invoice.payment_intent.client_secret,
			});
		} catch (err) {
			console.log(err);
			res.status(400).end();
		}
	}
}


module.exports = new StripeController();