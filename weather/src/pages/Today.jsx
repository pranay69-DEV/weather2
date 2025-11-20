import React from "react";
import CurrentWeather from "../components/CurrentWeather";


export default function Today({ data, unit }) {
if (!data) return <div className="info">No data for today</div>;
return (
<div>
<h2>Today's Weather</h2>
<CurrentWeather data={data} unit={unit} />
</div>
);
}