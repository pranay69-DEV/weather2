import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { fetchWeather } from "./api";

// Pages
import Home from "./pages/Home";
import Today from "./pages/Today";
import Hourly from "./pages/Hourly";
import Day10 from "./pages/Day10";
import Monthly from "./pages/Monthly";
import Radar from "./pages/Radar";

// Components
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

  // Load weather
  const load = async (c = city) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetchWeather(c, 5);
      setData(res);
    } catch (err) {
      setError(err.message || "Failed to load data");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Search submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city) return;
    load(city);
  };

  // ⭐ NEW: Use My Location
  const useMyLocation = () => {
    if (!navigator.geolocation) {
      setError("Your browser does not support location.");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        const coord = `${lat},${lon}`;
        setCity(coord);

        try {
          const res = await fetchWeather(coord, 5);
          setData(res);
        } catch (err) {
          setError("Failed to load your location weather.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location permission denied.");
        setLoading(false);
      }
    );
  };

  return (
    <Router>
      <div className="app-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2 className="side-logo">Weatherly</h2>
          <nav className="menu">
            <Link to="/">Home</Link>
            <Link to="/today">Today</Link>
            <Link to="/hourly">Hourly</Link>
            <Link to="/day10">10-Day</Link>
            <Link to="/monthly">Monthly</Link>
            <Link to="/radar">Radar</Link>
          </nav>
        </aside>

        <div className="app-root">
          <div className="animated-bg" aria-hidden />

          {/* Header */}
          <header className="header">
            <form className="search" onSubmit={handleSubmit} style={{ display: "flex", gap: 8 }}>
              <input
                className="search-input"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city (e.g. London)"
              />
              <button className="search-btn" type="submit">
                Search
              </button>

              {/* ⭐ NEW BUTTON */}
              <button type="button" className="search-btn" onClick={useMyLocation}>
                Use My Location
              </button>
            </form>

            <div className="controls">
              <TempToggle unit={unit} setUnit={setUnit} />
              <ThemeToggle theme={theme} setTheme={setTheme} />
            </div>
          </header>

          {/* Main Content */}
          <main className="container">
            {loading && <div className="info">Loading...</div>}
            {error && <div className="error">{error}</div>}

            <Routes>
              <Route path="/" element={<Home data={data} unit={unit} />} />
              <Route path="/today" element={<Today data={data} unit={unit} />} />
              <Route path="/hourly" element={<Hourly data={data} unit={unit} />} />
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
