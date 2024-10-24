const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const weatherRoutes = require('./routes/weatherRoutes');
require('dotenv').config();
const { startWeatherScheduler } = require('./scheduler/fetchWeatherFiveMin');
const { scheduleDailyUpdates } = require('./scheduler/scheduleDailySummary');
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userThresholdRoute')
const alertRoutes = require('./routes/alertRoute')
const {startAlertScheduler} = require('./scheduler/alertScheduler')

const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);  
app.use('/api', weatherRoutes);
app.use('/api/user', userRoutes);
app.use('/api/alerts', alertRoutes);

// Scheduler to update WeatherData database after every 10 minutes
startWeatherScheduler();

//Scheduler to update the WeatherSummaries after every 2 hours
scheduleDailyUpdates();

//Scheduler to check for updates in every half-hour
startAlertScheduler();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));