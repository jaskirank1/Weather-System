const express = require('express');
const { updateAlertThresholds } = require('../controllers/UserController');

const router = express.Router();

// Route to update user alert thresholds based on email
router.patch('/thresholds', updateAlertThresholds);

module.exports = router;
