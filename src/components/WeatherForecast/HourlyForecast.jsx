import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const HourlyForecast = ({ hourlyData }) => {
  const data = {
    labels: hourlyData.map((entry) => new Date(entry.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: hourlyData.map((entry) => entry.main.temp),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="hourly-forecast">
      <h2>Hourly Forecast</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default HourlyForecast;
