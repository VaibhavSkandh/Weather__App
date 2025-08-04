
import React from "react";

interface ForecastProps {
  hourly: {
    time: string;
    temp_c: number;
    condition: { text: string };
  }[];
  daily: {
    date: string;
    day: {
      mintemp_c: number;
      maxtemp_c: number;
      condition: { text: string };
    };
  }[];
  getIcon: (text: string) => React.ReactNode;
}

const Forecast: React.FC<ForecastProps> = ({ hourly, daily, getIcon }) => {
  return (
    <div className="forecast-section">
      {/* Hourly */}
      <h2 className="forecast-title">Today</h2>
      <div className="hourly-forecast-list">
        {hourly.slice(0, 9).map((hour, idx) => (
          <div key={idx} className="hourly-item">
            <p className="hourly-time">{hour.time.split(" ")[1]}</p>
            <div className="hourly-icon">{getIcon(hour.condition.text)}</div>
            <p className="hourly-temp">{hour.temp_c.toFixed(0)}°C</p>
          </div>
        ))}
      </div>

      {/* Daily */}
      <h2 className="forecast-title daily-title">Daily Forecast (Next 7 Days)</h2>
      <div className="daily-forecast-list">
        {daily.slice(0, 7).map((day, idx) => (
          <div key={idx} className="daily-item">
            <p className="daily-date">{day.date}</p>
            <div className="daily-icon">{getIcon(day.day.condition.text)}</div>
            <p className="daily-temp">
              {day.day.mintemp_c.toFixed(0)}° / {day.day.maxtemp_c.toFixed(0)}°C
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
