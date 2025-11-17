import React from "react";

export default function Radar() {
  return (
    <div>
      <h2>Weather Radar Map</h2>
      <iframe
        title="radar"
        src="https://embed.windy.com/"
        width="100%"
        height="500"
        style={{ border: 0, borderRadius: "12px" }}
      ></iframe>
    </div>
  );
}
