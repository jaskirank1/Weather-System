const User = require('../models/UserModel');

// Update user alert thresholds based on email as they are unique 
const updateAlertThresholds = async (req, res) => {
    const { email, temperature, weatherCondition, isActive } = req.body;

    const updatedUser = await User.findOneAndUpdate(
        { email },
        {
            'thresholds.temperature': temperature,
            'thresholds.weatherCondition': weatherCondition,
            'thresholds.isActive': isActive,
        },
        { new: true }
    );

    if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
};

module.exports = { updateAlertThresholds };