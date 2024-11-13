import React from 'react';

const DailyForecast = ({ dailyData }) => {
  const uniqueDays = [...new Set(dailyData.map(item => new Date(item.dt * 1000).toLocaleDateString()))];

  return (
    <div className="daily-forecast">
      <h3>Daily Forecast</h3>
      <div className="daily-items">
        {uniqueDays.map((day, index) => {
          const dayData = dailyData[index * 8];

          return (
            <div key={index} className="daily-item">
              <p>{day}</p>
              {dayData && dayData.main && dayData.weather ? (
                <>
                  <p>{dayData.main.temp}°C</p>
                  <p>{dayData.weather[0].description}</p>
                </>
              ) : (
                <p>Data not available</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyForecast;
