import {
  FcSection,
  FcTitle,
  HourlyItem,
  HourlyTime,
  HourlyList,
  DailyForecastList,
  DailyItem,
  HourlyTemp,
} from "../styles/Forecast.module";
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
    <FcSection>
      <FcTitle>Today</FcTitle>
      <HourlyList>
        {hourly.slice(0, 9).map((hour, idx) => (
          <HourlyItem key={idx}>
            <HourlyTime>{hour.time.split(" ")[1]}</HourlyTime>
            <div className="hourly-icon">{getIcon(hour.condition.text)}</div>
            <HourlyTemp>{hour.temp_c.toFixed(0)}°C</HourlyTemp>
          </HourlyItem>
        ))}
      </HourlyList>

      {/* Daily */}
      <FcTitle>Daily Forecast (Next 7 Days)</FcTitle>
      <DailyForecastList>
        {daily.slice(0, 7).map((day, idx) => (
          <DailyItem key={idx}>
            <p className="daily-date">{day.date}</p>
            <div className="daily-icon">{getIcon(day.day.condition.text)}</div>
            <p className="daily-temp">
              {day.day.mintemp_c.toFixed(0)}° / {day.day.maxtemp_c.toFixed(0)}°C
            </p>
          </DailyItem>
        ))}
      </DailyForecastList>
    </FcSection>
  );
};

export default Forecast;