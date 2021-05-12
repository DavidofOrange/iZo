const db = require('../db/db');

class SubscriptionController {
    async putSubscription(req, res) {
        try {
            const { id } = req.params;
            const changes = req.body;
            await db('subscriptions').where({id: id}).update(changes);
            res.status(200).end();
        } catch (err) {
            console.log(err);
            res.status(400).end();
        }
    }

}

module.exports = new SubscriptionController();