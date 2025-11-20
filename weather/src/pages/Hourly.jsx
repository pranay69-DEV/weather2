import React from "react";


export default function Hourly({ data, unit }) {
if (!data) return <div className="info">No hourly data</div>;


const hours = data.forecast?.forecastday?.[0]?.hour || [];


return (
<div>
<h2>Hourly</h2>
<div className="hour-grid">
{hours.map((h) => (
<div key={h.time_epoch} className="hour-card">
<div>{h.time.split(" ")[1]}</div>
<div>{Math.round(h.temp_c)}°C</div>
<div>{h.condition.text}</div>
</div>
))}
</div>
</div>
);
}