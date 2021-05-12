const express = require('express');
const subscriptionsController = require('../controllers/subscriptions');

const router = express.Router();

router.use(express.json());
router.put('/:id', subscriptionsController.putSubscription);

module.exports = router;
