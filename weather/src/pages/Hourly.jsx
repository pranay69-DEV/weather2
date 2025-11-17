import React from "react";

export default function Hourly({ data }) {
  if (!data) return <div>No data</div>;

  return (
    <div>
      <h2>Hourly Forecast</h2>
      {data.forecast.forecastday[0].hour.map((h, i) => (
        <div key={i} className="hour-card">
          <strong>{h.time.split(" ")[1]}</strong> — {h.temp_c}°C
        </div>
      ))}
    </div>
  );
}
