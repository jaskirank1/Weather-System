# Real-Time Weather Monitoring Application

This project is a **Real-Time Data Processing System for Weather Monitoring**, developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). The system retrieves, processes, and stores weather data from multiple cities and provides insights through visualizations and alerts based on user-defined settings.

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Design Choices](#design-choices)
5. [Project Structure](#project-structure)
6. [Installation and Setup](#installation-and-setup)
7. [Running the Application](#running-the-application)
8. [API Endpoints](#api-endpoints)
9. [Dependencies](#dependencies)

## Overview

The **Real-Time Weather Monitoring Application** fetches data from the OpenWeatherMap API at configurable intervals and stores it in a database for various cities. Users can visualize this data, set alert thresholds, and monitor conditions in real-time. Key functionalities include weather data roll-ups, aggregations, alert settings, user authentication, and city-based weather tracking.

## Features

- **Dashboard**: Displays current and historical weather conditions for a selected city.
- **Dashboard-Navbar**: Allows users to select cities and temperature units (Celsius/Fahrenheit).
- **Weather Card**: Shows the current weather details and updates automatically.
- **Charts**: Visual representation of daily weather summaries like average, max, and min temperatures.
- **Alerts**: Set and manage alert thresholds (e.g., high temperature) and receive notifications.
- **Authentication**: User sign-in and sign-out functionality to maintain alert preferences.
- **Data Processing**: Fetches weather data periodically and stores daily summaries for further analysis.

## Tech Stack

- **Frontend**: React.js, Context API
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Styling**: CSS, Weather Icons (via 'weather-icons' npm package)

## Design Choices

- **Data Consistency and Separation**: The project uses a dedicated folder for scheduling tasks (`/scheduler`) to keep server logic clean and manageable.
- **State Management**: The app uses Context API to maintain user preferences like city and temperature units globally, avoiding unnecessary prop drilling.
- **User Authentication**: Implements JWT-based authentication for secure user management.
- **Flexible Data Fetching**: The backend fetches and stores weather summaries at periodic intervals, ensuring continuous updates without overwriting existing summaries.
- **Responsive Alerts**: Users can set thresholds and receive alerts dynamically, without persistent storage of alert messages in the database.
- **Professional Weather Icons**: Uses the ‘weather-icons’ npm package for a polished UI, reflecting different weather conditions.


## Installation and Setup

### Prerequisites

- **Node.js** (v14 or higher)
- **NPM** (comes with Node.js)

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jaskirank1/Weather-System.git

2. **Install backend dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file** and add the following environment variables:
   ```makefile
   JWT_SECRET = "random#secret"
   WEATHER_API_KEY="4143a21ea6be52d4f63d350eae831aa0"
   MONGODB_URI="mongodb+srv://kiran18202:PsqXlUzMcP4RmCdK@weathersystem.s9j6v.mongodb.net/"
   ```

4. **Setup the database**: You don't need to set up a local MongoDB database. Ensure you have a MongoDB Atlas account and have created a cluster.

### Frontend Setup

1. **Navigate to the frontend folder**:
   ```bash
   cd ../WeatherFrontend
   ```

2. **Install frontend dependencies**:
   ```bash
   npm install
   ```

## Running the Application

1. **Start the backend server**:
   ```bash
   cd ../WeatherBackend
   npm start
   ```

2. **Start the frontend development server**:
   ```bash
   cd ../WeatherFrontend
   npm run dev
   ```

## API Endpoints

### **Authentication Data Endpoints (`/api/auth`)**
- **`POST /api/auth/signup`** : Register a new user.
- **`POST /api/auth/signin`**: Sign in a user and receive a token.

### **Weather Data Endpoints (`/api`)**
- **`GET /api/weather`**: Fetches current weather data for a specific city from the OpenWeatherMap API.
- **`GET /api/fetchAllWeather`**: Retrieves weather data for all monitored cities.
- **`GET /api/daily-summary`**: Returns the latest daily weather summary, including min, max, and average temperatures for a specific city.
- **`GET /api/daily-summary-chart`**: Retrieves daily weather summaries for all cities to be visualized in charts.
- **`POST /api/calculate-store`**: Calculates and stores the daily weather summary in the database.

### **User Alert Endpoints (`/api/user`)**
- **`PATCH /api/user/thresholds`**: Allows authenticated users to update their alert thresholds (e.g., set high-temperature alerts).

### **Alert Check Endpoints (`/api/alerts`)**
- **`GET /api/alerts`**: Checks and returns active weather alerts based on set thresholds. If no alerts are triggered, a response indicating "No alerts at the moment" is returned.


## Dependencies

### Backend
- **Express.js**: Web framework for Node.js.
- **Mongoose**: MongoDB object modeling.
- **Axios**: HTTP client for fetching weather data.
- **Node-Schedule**: Scheduler for weather data fetching.
- **JWT**: JSON Web Token for authentication.
  
### Frontend
- **React.js**: JavaScript library for building UI.
- **Context API**: For state management.
- **Axios**: HTTP client for API calls.
- **Weather-Icons**: Professional weather icons.
- **Chart.js**: Visual representation of weather data.