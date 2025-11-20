import React from "react";


export default function TempToggle({ unit, setUnit }) {
return (
<div className="temp-toggle">
<button onClick={() => setUnit("C")} className={unit === "C" ? "active" : ""}>°C</button>
<button onClick={() => setUnit("F")} className={unit === "F" ? "active" : ""}>°F</button>
</div>
);
}