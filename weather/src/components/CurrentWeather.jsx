function toTemp(tempC, unit) {
  if (unit === "F") {
    return `${Math.round((tempC * 9) / 5 + 32)}°F`;
  }
  return `${Math.round(tempC)}°C`;
}

export default function CurrentWeather({ data, unit }) {
  if (!data) return null;

  const cur = data.current;
  const loc = data.location;

  return (
    <div className="current-weather card">
      <div className="left">
        <img
          src={cur.condition.icon}
          alt={cur.condition.text}
          className="big-icon"
        />
        <div className="temp">{toTemp(cur.temp_c, unit)}</div>
        <div className="desc">{cur.condition.text}</div>
      </div>

      <div className="right">
        <h3>
          {loc.name}, {loc.country}
        </h3>
        <ul>
          <li>Humidity: {cur.humidity}%</li>
          <li>Wind: {cur.wind_kph} kph</li>
          <li>Feels like: {toTemp(cur.feelslike_c, unit)}</li>
          <li>
            AQI PM2.5:{" "}
            {cur.air_quality?.pm2_5
              ? cur.air_quality.pm2_5.toFixed(1)
              : "N/A"}
          </li>
        </ul>
      </div>
    </div>
  );
}
