import React from "react";


export default function ThemeToggle({ theme, setTheme }) {
return (
<div className="theme-toggle">
<button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>Toggle theme</button>
</div>
);
}