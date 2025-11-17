import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { fetchWeather } from "./api";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import ThemeToggle from "./components/ThemeToggle";
import TempToggle from "./components/TempToggle";

// Pages
import Today from "./pages/Today";
import Hourly from "./pages/Hourly";
import Day10 from "./pages/Day10";
import Monthly from "./pages/Monthly";
import Radar from "./pages/Radar";

export default function App() {
  const [city, setCity] = useState("London");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("C");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

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

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    load(city);
  };

  return (
    <Router>
      <div className="app-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2 className="side-logo">Weatherly</h2>
          <nav className="menu">
            <Link to="/">Today</Link>
            <Link to="/hourly">Hourly</Link>
            <Link to="/day10">10-Day</Link>
            <Link to="/monthly">Monthly</Link>
            <Link to="/radar">Radar</Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="app-root">
          <div className="animated-bg" aria-hidden />

          <header className="header">
            <div className="controls">
              <TempToggle unit={unit} setUnit={setUnit} />
              <ThemeToggle theme={theme} setTheme={setTheme} />
            </div>
          </header>

          <main className="container">
            {/* Search Bar */}
            <form className="search" onSubmit={handleSubmit}>
              <input
                className="search-input"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city (e.g. London)"
              />
              <button className="search-btn">Search</button>
            </form>

            {loading && <div className="info">Loading...</div>}
            {error && <div className="error">{error}</div>}

            {/* Pages */}
           <Routes>
  <Route path="/" element={<Today data={data} unit={unit} />} />
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
