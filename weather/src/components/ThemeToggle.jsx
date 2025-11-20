import React from "react";

export default function ThemeToggle({ theme, setTheme }) {
  return (
    <div className="theme-toggle">
      <button
        className="theme-btn"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        title="Toggle Theme"
        style={{
          fontSize: "20px",
          padding: "8px 12px",
          borderRadius: "8px",
          cursor: "pointer",
          background: "var(--card-bg)",
          border: "1px solid var(--border-color)"
        }}
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </div>
  );
}
