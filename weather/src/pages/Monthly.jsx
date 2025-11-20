import React, { useState } from "react";
import { fetchWeather } from "../api"; // ⬅ IMPORTANT: import API
import "./Monthly.css";

export default function Monthly() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const monthName = today.toLocaleString("default", { month: "long" });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const [selectedDay, setSelectedDay] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push("");
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  // ⭐ Load weather for clicked day
  const handleDayClick = async (day) => {
    if (!day) return;

    setSelectedDay(day);
    setLoading(true);

    const dateStr = `${year}-${month + 1}-${day}`;

    try {
      const res = await fetchWeather("London", 10); // you can change city
      // find matching forecast date
      const match = res.forecast.forecastday.find((d) => d.date === dateStr);
      setWeather(match || null);
    } catch (err) {
      setWeather(null);
    }

    setLoading(false);
  };

  return (
    <div className="monthly-container">
      <h2 className="month-title">
        {monthName} {year}
      </h2>

      <div className="calendar">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="weekday">
            {d}
          </div>
        ))}

        {days.map((d, i) => {
          const isToday = d === today.getDate();
          return (
            <div
              key={i}
              className={`day ${isToday ? "today" : ""}`}
              onClick={() => handleDayClick(d)}
            >
              {d}
            </div>
          );
        })}
      </div>

      {/* Weather Box */}
      {loading && <div className="weather-box">Loading...</div>}

      {!loading && weather && (
        <div className="weather-box">
          <h3>Weather on {weather.date}</h3>
          <img src={weather.day.condition.icon} alt="" />
          <p>{weather.day.condition.text}</p>
          <p>🌡 Max: {weather.day.maxtemp_c}°C</p>
          <p>🌡 Min: {weather.day.mintemp_c}°C</p>
        </div>
      )}

      {!loading && selectedDay && !weather && (
        <div className="weather-box">No forecast data for this day</div>
      )}
    </div>
  );
}
