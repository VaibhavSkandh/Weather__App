import {
  FC_Section,
  FC_Title,
  Hourly_item,
  Hourly_time,
  Hourly_list,
  Daily_forecast_list,
  Daily_item,
  Hourly_temp,
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
    <FC_Section>
      <FC_Title>Today</FC_Title>
      <Hourly_list>
        {hourly.slice(0, 9).map((hour, idx) => (
          <Hourly_item key={idx}>
            <Hourly_time>{hour.time.split(" ")[1]}</Hourly_time>
            <div className="hourly-icon">{getIcon(hour.condition.text)}</div>
            <Hourly_temp>{hour.temp_c.toFixed(0)}°C</Hourly_temp>
          </Hourly_item>
        ))}
      </Hourly_list>

      {/* Daily */}
      <FC_Title>Daily Forecast (Next 7 Days)</FC_Title>
      <Daily_forecast_list>
        {daily.slice(0, 7).map((day, idx) => (
          <Daily_item key={idx}>
            <p className="daily-date">{day.date}</p>
            <div className="daily-icon">{getIcon(day.day.condition.text)}</div>
            <p className="daily-temp">
              {day.day.mintemp_c.toFixed(0)}° / {day.day.maxtemp_c.toFixed(0)}°C
            </p>
          </Daily_item>
        ))}
      </Daily_forecast_list>
    </FC_Section>
  );
};

export default Forecast;