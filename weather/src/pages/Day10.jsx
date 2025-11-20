import React from "react";


export default function Day10({ data, unit }) {
if (!data) return <div className="info">No 10-day data</div>;
const days = data.forecast?.forecastday || [];


return (
<div>
<h2>10-Day Forecast</h2>
<div className="day-grid">
{days.map((d) => (
<div key={d.date} className="day-card">
<div>{d.date}</div>
<div>Avg: {Math.round(d.day.avgtemp_c)}°C</div>
<div>{d.day.condition.text}</div>
</div>
))}
</div>
</div>
);
}