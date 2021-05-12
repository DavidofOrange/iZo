const express = require('express');
const cookieParser = require("cookie-parser");
const userController = require('../controllers/users');

const router = express.Router();

// API calls for /api/businesses
router.use(cookieParser());
router.use(express.json());
router.post('/sign-up', userController.postUsers);
router.post('/login', userController.loginUsers);
router.post('/logout', userController.logoutUsers);

module.exports = router;