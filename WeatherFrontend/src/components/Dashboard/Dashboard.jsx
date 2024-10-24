import React from 'react'
import NavbarDashboard from './NavbarDashboard/NavbarDashboard'
import WeatherCard from './WeatherCard/WeatherCard'
import './Dashboard.css'
import DailySummary from './DailySummary/DailySummary'
import WeatherChart from './WeatherChart/WeatherChart'

const Dashboard = () => {
  return (
    <div>
      <div className="weather-dashboard">
        <NavbarDashboard />
        <div className="weather-card-dasdhboard">
          <WeatherCard />
          <DailySummary />
        </div>
        <div className='weather-chart-dashborad'>
          <WeatherChart/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
