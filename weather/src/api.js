
// Simple wrapper for WeatherAPI (forecast + current)
const BASE = 'https://api.weatherapi.com/v1'
// default key from your earlier message; replace if you want a private key
export const KEY = '4dcf11c038b64faa8a843305250511'


export async function fetchWeather(city = 'London', days = 5) {
const url = `${BASE}/forecast.json?key=${KEY}&q=${encodeURIComponent(city)}&days=${days}&aqi=yes&alerts=no`
const res = await fetch(url)
if (!res.ok) throw new Error('Location not found')
return res.json()
}
