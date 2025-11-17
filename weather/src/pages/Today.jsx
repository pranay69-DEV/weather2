import React from "react";
import CurrentWeather from "../components/CurrentWeather";
import Forecast from "../components/Forecast";

export default function Today({ data, unit }) {
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <CurrentWeather data={data} unit={unit} />
      <h2 className="section-title">5-Day Forecast</h2>
      <Forecast data={data} unit={unit} />
    </div>
  );
}
