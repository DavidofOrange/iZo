const express = require('express');
const busUserController = require('../controllers/busUsers');

const router = express.Router();

// API calls for /api/businesses
router.use(express.json());
router.post('/sign-up', busUserController.postBusUsers);
router.post('/login', busUserController.loginBusUsers);
router.post('/logout', busUserController.logoutBusUsers);

module.exports = router;