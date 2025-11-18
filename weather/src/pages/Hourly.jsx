import React from "react";
import "./Hourly.css";

export default function Hourly({ data, view = 1 }) {
  if (!data) return <div>No data</div>;

  const hours = data.forecast.forecastday[0].hour;

 return (
  <div>
    <h2>Hourly Forecast — All Views</h2>

    {/* 1️⃣ Line-by-line */}
    <h3>View 1 — Line by line</h3>
    <div>
      {hours.map((h, i) => (
        <div key={i} className="line-item">
          <strong>{h.time.split(" ")[1]}</strong> — {h.temp_c}°C
        </div>
      ))}
    </div>

    {/* 2️⃣ Card Layout */}
    <h3>View 2 — Cards</h3>
    <div className="hour-cards">
      {hours.map((h, i) => (
        <div key={i} className="hour-card">
          <h3>{h.time.split(" ")[1]}</h3>
          <p>{h.temp_c}°C</p>
          <img src={h.condition.icon} alt="" />
          <p>{h.condition.text}</p>
        </div>
      ))}
    </div>

    {/* 3️⃣ Horizontal Scroll */}
    <h3>View 3 — Horizontal Scroll</h3>
    <div className="scroll-container">
      {hours.map((h, i) => (
        <div key={i} className="scroll-card">
          <strong>{h.time.split(" ")[1]}</strong>
          <img src={h.condition.icon} alt="" />
          <p>{h.temp_c}°C</p>
        </div>
      ))}
    </div>

    {/* 4️⃣ Table Layout */}
    <h3>View 4 — Table</h3>
    <table className="hour-table">
      <thead>
        <tr>
          <th>Time</th>
          <th>Temp</th>
          <th>Condition</th>
        </tr>
      </thead>
      <tbody>
        {hours.map((h, i) => (
          <tr key={i}>
            <td>{h.time.split(" ")[1]}</td>
            <td>{h.temp_c}°C</td>
            <td>{h.condition.text}</td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* 5️⃣ Grid Layout */}
    <h3>View 5 — Grid</h3>
    <div className="hour-grid">
      {hours.map((h, i) => (
        <div key={i} className="grid-card">
          <strong>{h.time.split(" ")[1]}</strong>
          <p>{h.temp_c}°C</p>
          <img src={h.condition.icon} alt="" />
        </div>
      ))}
    </div>
  </div>
);
}
   