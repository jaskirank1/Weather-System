const express = require('express');
const router = express.Router();
const { checkAlerts } = require('../controllers/alertController')

router.get('/', async (req, res) => {
    try {
        const alertResponse = await checkAlerts(); // Call the checkAlerts function
        if (alertResponse) {
            return res.status(200).json(alertResponse); // Return alert status
        }
        return res.status(200).json({ status: 'no alert', message: 'No alerts at the moment.' });
    } catch (error) {
        console.error('Error checking alerts:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
