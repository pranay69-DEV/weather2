import React, { useEffect, useState } from 'react'
import { fetchWeather } from './api'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast'
import ThemeToggle from './components/ThemeToggle'
import TempToggle from './components/TempToggle'


export default function App() {
const [city, setCity] = useState('London')
const [data, setData] = useState(null)
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)
const [unit, setUnit] = useState('C')
const [theme, setTheme] = useState('light')


useEffect(() => {
document.documentElement.setAttribute('data-theme', theme)
}, [theme])


const load = async (c = city) => {
setLoading(true)
setError(null)
try {
const res = await fetchWeather(c, 5)
setData(res)
} catch (err) {
setError(err.message)
setData(null)
} finally {
setLoading(false)
}
}


useEffect(() => {
load()
}, [])


const handleSubmit = (e) => {
e.preventDefault()
load(city)
}


return (
<div className="app-root">
<div className="animated-bg" aria-hidden />


<header className="header">
<h1 className="logo">Weatherly</h1>
<div className="controls">
<TempToggle unit={unit} setUnit={setUnit} />
<ThemeToggle theme={theme} setTheme={setTheme} />
</div>
</header>


<main className="container">
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


{data && (
<section>
<CurrentWeather data={data} unit={unit} />
<h2 className="section-title">5-Day Forecast</h2>
<Forecast data={data} unit={unit} />
</section>
)}


<footer className="footer">Data from WeatherAPI.com</footer>
</main>
</div>
)
}