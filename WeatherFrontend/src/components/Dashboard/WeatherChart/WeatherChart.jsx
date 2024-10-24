import React, { useEffect, useState } from 'react';
import './WeatherChart.css';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { useWeatherContext } from '../../../context/WeatherContext';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const WeatherChart = () => {
    const { unit, selectedCity } = useWeatherContext();
    const [data, setData] = useState({});
    const [error, setError] = useState('');

    const fetchWeatherSummaries = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/daily-summary-chart?city=${selectedCity}`);
            const summaries = response.data;

            const currentTime = new Date();
            const hours = currentTime.getHours();

            // Filter and format data for the last 24 hours
            const relevantSummaries = summaries.filter(summary => {
                const summaryDate = new Date(summary.date);
                return summaryDate >= new Date(currentTime.setHours(hours - 24));
            });

            const labels = relevantSummaries.map(summary => summary.time);

            const avgTemps = relevantSummaries.map(summary => summary.averageTemp);
            const maxTemps = relevantSummaries.map(summary => summary.maxTemp);
            const minTemps = relevantSummaries.map(summary => summary.minTemp);

            setData({
                labels,
                datasets: [
                    {
                        label: 'Average Temperature',
                        data: avgTemps,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: true,
                        borderWidth: 2,
                    },
                    {
                        label: 'Max Temperature',
                        data: maxTemps,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: true,
                        borderWidth: 2,
                    },
                    {
                        label: 'Min Temperature',
                        data: minTemps,
                        borderColor: 'rgba(255, 206, 86, 1)',
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        fill: true,
                        borderWidth: 2,
                    },
                ],
            });
            setError('');
        } catch (error) {
            console.error('Error fetching weather summaries:', error);
            setError('Error fetching weather summaries. Please try again later.');
        }
    };

    useEffect(() => {
        fetchWeatherSummaries();
    }, [selectedCity]);

    return (
        <div className='weather-chart'>
            <h2>Weather Summary for {selectedCity}</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {data.labels ? (
                <div style={{ width: '100%', height: '300px', backgroundColor: '#3a3f44', padding: '15px', borderRadius: '8px' }}>
                    <Line
                        data={data}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Time (HH:MM)',
                                        color: '#ffffff', 
                                    },
                                    ticks: {
                                        color: '#ffffff', 
                                    },
                                },
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        stepSize: 5,
                                        maxTicksLimit: 5,
                                        color: '#ffffff',
                                    },
                                },
                            },
                            plugins: {
                                legend: {
                                    labels: {
                                        color: '#ffffff',
                                    },
                                },
                            },
                        }}
                    />
                </div>
            ) : (
                <div>No valid weather data available to display.</div>
            )}
        </div>
    );
};

export default WeatherChart;