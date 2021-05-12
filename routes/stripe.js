const express = require('express');
const stripeController = require('../controllers/stripe');

const router = express.Router();

router.use(express.json());
router.post('/create-customer', stripeController.createCustomer);
router.post('/create-subscription', stripeController.createSubscription);

module.exports = router;
