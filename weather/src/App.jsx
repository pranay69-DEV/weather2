import React, { useState, useEffect } from "react";
import { fetchWeather } from "./api";

// Pages (optional: you can render real data here)
import Home from "./pages/Home";
import Today from "./pages/Today";
import Hourly from "./pages/Hourly";
import Day10 from "./pages/Day10";
import Monthly from "./pages/Monthly";
import Radar from "./pages/Radar";

export default function App() {
  const [active, setActive] = useState("home"); // Sidebar selection
  const [city, setCity] = useState("London");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("C");

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

  // Optional: Use My Location
  const useMyLocation = () => {
    if (!navigator.geolocation) {
      setError("Your browser does not support location.");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const coord = `${pos.coords.latitude},${pos.coords.longitude}`;
        setCity(coord);
        try {
          const res = await fetchWeather(coord, 5);
          setData(res);
        } catch {
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

  // Render placeholder or page content based on sidebar selection
  const renderContent = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    switch (active) {
      case "home":
        return <Home data={data} unit={unit} />;
      case "today":
        return <Today data={data} unit={unit} />;
      case "hourly":
        return <Hourly data={data} unit={unit} />;
      case "day10":
        return <Day10 data={data} unit={unit} />;
      case "monthly":
        return <Monthly />;
      case "radar":
        return <Radar />;
      default:
        return <p>Select an option from the left menu.</p>;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        {/* Sidebar */}
        <nav className="col-3 col-md-2 bg-dark p-3 border-end d-flex flex-column">
          <h2 className="text-center mb-3 text-warning">Weatherly</h2>
          {["home","today","hourly","day10","monthly","radar"].map((item) => (
            <button
              key={item}
              className={`btn btn-dark text-start mb-1 ${
                active === item ? "btn-primary" : ""
              }`}
              onClick={() => setActive(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}

          <div className="mt-3">
            <button className="btn btn-outline-light w-100 mb-2" onClick={useMyLocation}>
              Use My Location
            </button>
            <button className="btn btn-outline-light w-100" onClick={() => load()}>
              Reload Weather
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <main className="col-9 col-md-10 p-4 text-light">
          <h1 className="mb-3 text-warning">
            {active.charAt(0).toUpperCase() + active.slice(1)}
          </h1>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
