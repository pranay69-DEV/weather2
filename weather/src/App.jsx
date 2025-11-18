import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { fetchWeather } from "./api";
import Today from "./pages/Today";
import Hourly from "./pages/Hourly";
import Day10 from "./pages/Day10";
import Monthly from "./pages/Monthly";
import Radar from "./pages/Radar";

import Sidebar from "./components/Sidebar";
import ThemeToggle from "./components/ThemeToggle";
import TempToggle from "./components/TempToggle";

export default function App() {
  const [city, setCity] = useState("London");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("C");
  const [theme, setTheme] = useState("light");

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Fetch weather
  const load = async (c = city) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetchWeather(c, 5);
      setData(res);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  // Detect user's location
  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          setCity(`${lat},${lon}`);
          load(`${lat},${lon}`);
        },
        (err) => {
          console.error("Location denied:", err);
          load(city); // fallback
        }
      );
    } else {
      load(city);
    }
  };

  // Load initial weather (auto location)
  useEffect(() => {
    detectLocation();
  }, []);

  // Search submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    load(city);
  };

  return (
    <Router>
      <div className="app-layout">
        {/* ---- SIDEBAR ---- */}
        <Sidebar />

        <div className="app-root">
          {/* ---- HEADER (Theme + Temp Toggles) ---- */}
          <header className="header">
            <div className="controls">
              <TempToggle unit={unit} setUnit={setUnit} />
              <ThemeToggle theme={theme} setTheme={setTheme} />
            </div>
          </header>

          <main className="container">
            {/* ---- SEARCH BAR ---- */}
            <form className="search" onSubmit={handleSubmit}>
              <input
                className="search-input"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city (e.g., London)"
              />

              <button className="search-btn">Search</button>

              {/* NEW: USE MY LOCATION BUTTON */}
              <button
                type="button"
                className="search-btn"
                onClick={detectLocation}
                style={{ marginLeft: "10px" }}
              >
                📍 Use My Location
              </button>
            </form>

            {/* ---- LOADING + ERROR ---- */}
            {loading && <div className="info">Loading...</div>}
            {error && <div className="error">{error}</div>}

            {/* ---- PAGES ---- */}
            <Routes>
              <Route path="/" element={<Today data={data} unit={unit} />} />
              <Route path="/hourly" element={<Hourly data={data} view={1} />} />
<Route path="/hourly" element={<Hourly data={data} view={2} />} />
<Route path="/hourly" element={<Hourly data={data} view={3} />} />
<Route path="/hourly" element={<Hourly data={data} view={4} />} />
<Route path="/hourly" element={<Hourly data={data} view={5} />} />

              <Route path="/day10" element={<Day10 data={data} unit={unit} />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/radar" element={<Radar />} />
            </Routes>

            <footer className="footer">Data from WeatherAPI.com</footer>
          </main>
        </div>
      </div>
    </Router>
  );
}
