const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    thresholds: {
        temperature: { type: Number, default: null },
        weatherCondition: { type: String, default: null },
        isActive: { type: Boolean, default: false },
    },
});

module.exports = mongoose.model('User', UserSchema);