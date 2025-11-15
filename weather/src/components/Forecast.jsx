import React from 'react'


function toTemp(tempC, unit) {
return unit === 'C' ? `${tempC.toFixed(1)}°C` : `${(tempC * 9/5 + 32).toFixed(1)}°F`
}


export default function Forecast({ data, unit }) {
if (!data) return null
const days = data.forecast?.forecastday || []
return (
<div className="forecast">
{days.map((d) => (
<div key={d.date} className="forecast-day card small">
<div className="date">{d.date}</div>
<img src={d.day.condition.icon} alt={d.day.condition.text} />
<div className="cond">{d.day.condition.text}</div>
<div className="temps">
<span>Max: {toTemp(d.day.maxtemp_c, unit)}</span>
<span>Min: {toTemp(d.day.mintemp_c, unit)}</span>
</div>
<div className="chance">Precip: {d.day.daily_chance_of_rain}%</div>
</div>
))}
</div>
)
}