import React, { useState, useEffect } from "react";
import "./Monthly.css";

const API_KEY = "4dcf11c038b64faa8a843305250511"; 
const DEFAULT_LOCATION = "London";

export default function Monthly() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [weather, setWeather] = useState(null);
  const [todayWeather, setTodayWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  const firstDay = new Date(year, currentDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  function prevMonth() {
    setCurrentDate(new Date(year, currentDate.getMonth() - 1, 1));
    setWeather(null);
  }

  function nextMonth() {
    setCurrentDate(new Date(year, currentDate.getMonth() + 1, 1));
    setWeather(null);
  }

  // 🟦 Fetch Current Weather (using your API)
  useEffect(() => {
    async function loadCurrentWeather() {
      const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${DEFAULT_LOCATION}&aqi=yes`;

      const res = await fetch(url);
      const data = await res.json();

      setTodayWeather(data.current);
    }

    loadCurrentWeather();
  }, []);

  // 🟩 Fetch History Weather for selected date
  async function fetchClimate(day) {
    const d = new Date(year, currentDate.getMonth(), day);
    const dateString = d.toISOString().split("T")[0];

    setSelectedDate(dateString);
    setLoading(true);

    try {
      const url = `https://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${DEFAULT_LOCATION}&dt=${dateString}`;

      const res = await fetch(url);
      const data = await res.json();

      setWeather(data.forecast.forecastday[0].day);
    } catch (err) {
      console.log(err);
      setWeather(null);
    }

    setLoading(false);
  }

  return (
    <div className="monthly-wrapper">
      <h2>{monthName} {year}</h2>

      {/* Today Weather Box */}
      {todayWeather && (
        <div className="today-box">
          <h3>Today's Weather ({DEFAULT_LOCATION})</h3>
          <p>🌡 Temp: {todayWeather.temp_c}°C</p>
          <p>💨 Wind: {todayWeather.wind_kph} kph</p>
          <p>💧 Humidity: {todayWeather.humidity}%</p>
          <p>🌥 {todayWeather.condition.text}</p>
        </div>
      )}

      <div className="month-controls">
        <button onClick={prevMonth}>◀</button>
        <button onClick={nextMonth}>▶</button>
      </div>

      <div className="week-row">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
          <div key={d} className="week-name">{d}</div>
        ))}
      </div>

      <div className="days-grid">
        {days.map((day, idx) => (
          <div
            key={idx}
            className={`day-cell ${day ? "active" : ""}`}
            onClick={() => day && fetchClimate(day)}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Clicked Date Weather */}
      {selectedDate && (
        <div className="climate-panel">
          <h3>Climate on {selectedDate}</h3>

          {loading && <p>Loading...</p>}

          {weather && (
            <>
              <p>🌡 Max: {weather.maxtemp_c}°C</p>
              <p>❄ Min: {weather.mintemp_c}°C</p>
              <p>☁ Avg: {weather.avgtemp_c}°C</p>
              <p>💧 Humidity: {weather.avghumidity}%</p>
              <p>🌤 Condition: {weather.condition.text}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
