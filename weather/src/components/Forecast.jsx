import React from "react";


export default function Forecast({ data }) {
if (!data) return null;
const days = data.forecast?.forecastday || [];


return (
<section className="forecast">
<h4>Forecast</h4>
<div className="forecast-grid">
{days.map((d) => (
<div className="forecast-card" key={d.date}>
<div className="date">{d.date}</div>
<div className="cond">{d.day.condition.text}</div>
<div className="temps">{Math.round(d.day.maxtemp_c)}°C / {Math.round(d.day.mintemp_c)}°C</div>
</div>
))}
</div>
</section>
);
}