const express = require('express');
const cookieParser = require("cookie-parser");
const businessController = require('../controllers/businesses');
const verifyUser = require("./auth");

const router = express.Router();

// API calls for /api/businesses
router.use(express.json());
router.use(cookieParser());
router.get('/', businessController.getBusinesses);
router.post('/', verifyUser, businessController.postBusiness);
router.put('/:id', businessController.putBusiness);

module.exports = router;