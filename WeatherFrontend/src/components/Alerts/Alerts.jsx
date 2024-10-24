import React, { useState } from 'react';
import './Alerts.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Alerts = () => {
    const [email, setEmail] = useState('');
    const [temperatureThreshold, setTemperatureThreshold] = useState('');
    const [weatherCondition, setWeatherCondition] = useState('');
    const [isActive, setIsActive] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/api/user/thresholds`, {
                email,
                temperature: temperatureThreshold,
                weatherCondition,
                isActive,
            });
            toast.success('Alert settings updated successfully!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error updating alert settings.');
        }
    };

    return (
      <div className="alert-main">
        <div className="alerts-container">
            <h2>Alert Settings</h2>
            <form onSubmit={handleSubmit} className="alerts-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input-field"
                />
                <input
                    type="number"
                    placeholder="Temperature Threshold (°C)"
                    value={temperatureThreshold}
                    onChange={(e) => setTemperatureThreshold(e.target.value)}
                    required
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Weather Condition (e.g., rain, sunny)"
                    value={weatherCondition}
                    onChange={(e) => setWeatherCondition(e.target.value)}
                    required
                    className="input-field"
                />
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={isActive}
                        onChange={() => setIsActive(!isActive)}
                    />
                    Activate Alerts
                </label>
                <button type="submit" className="submit-button">Update Alert Settings</button>
            </form>
        </div>
      </div>
    );
}

export default Alerts;