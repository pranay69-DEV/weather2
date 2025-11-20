import React from "react";
import CurrentWeather from "../components/CurrentWeather";
import Forecast from "../components/Forecast";


export default function Home({ data, unit }) {
if (!data) return <div className="info">No weather data yet. Try searching for a city.</div>;


return (
<div>
<CurrentWeather data={data} unit={unit} />
<Forecast data={data} unit={unit} />
</div>
);
}