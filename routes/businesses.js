const express = require('express');
const businessController = require('../controllers/businesses');
const verifyUser = require("./auth");

const router = express.Router();

// API calls for /api/businesses
router.use(express.json());
router.get('/', businessController.getBusinesses);
router.post('/', verifyUser, businessController.postBusiness);
router.put('/:id', businessController.putBusiness);

module.exports = router;