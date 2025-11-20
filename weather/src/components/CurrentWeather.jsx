import React from "react";


export default function CurrentWeather({ data, unit = "C" }) {
if (!data) return null;
const loc = data.location;
const cur = data.current;


const temp = unit === "C" ? `${Math.round(cur.temp_c)}°C` : `${Math.round(cur.temp_f)}°F`;


return (
<section className="current">
<div className="current-top">
<h3>{loc.name}, {loc.country}</h3>
<div className="temp">{temp}</div>
</div>
<div className="current-bottom">
<div>{cur.condition.text}</div>
<div>Humidity: {cur.humidity}%</div>
<div>Wind: {cur.wind_kph} kph</div>
</div>
</section>
);
}