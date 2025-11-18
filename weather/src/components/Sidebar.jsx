import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="side-logo">Weather App</h2>

      <nav className="menu">
        <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>
          Today
        </NavLink>

        <NavLink to="/hourly" className={({ isActive }) => isActive ? "active-link" : ""}>
          Hourly
        </NavLink>

        <NavLink to="/day10" className={({ isActive }) => isActive ? "active-link" : ""}>
          10-Day
        </NavLink>

        <NavLink to="/monthly" className={({ isActive }) => isActive ? "active-link" : ""}>
          Monthly
        </NavLink>

        <NavLink to="/radar" className={({ isActive }) => isActive ? "active-link" : ""}>
          Radar
        </NavLink>
      </nav>
    </aside>
  );
}
