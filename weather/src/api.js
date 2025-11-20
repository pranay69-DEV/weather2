// Simple WeatherAPI wrapper (forecast + current)
const BASE = "https://api.weatherapi.com/v1";

// 🔐 Use your real key
export const KEY = "b765dffced5440019d2103442252011";

// ===============================
// ✅ FETCH CURRENT WEATHER
// ===============================
export async function fetchCurrent(q = "London") {
  const url = `${BASE}/current.json?key=${KEY}&q=${encodeURIComponent(q)}&aqi=yes`;

  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`WeatherAPI error: ${res.status} ${res.statusText} ${text}`);
  }
  return res.json();
}

// ===============================
// ✅ FETCH FORECAST WEATHER
// ===============================
export async function fetchWeather(q = "London", days = 5) {
  const url = `${BASE}/forecast.json?key=${KEY}&q=${encodeURIComponent(q)}&days=${days}&aqi=yes&lang=en`;

  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`WeatherAPI error: ${res.status} ${res.statusText} ${text}`);
  }
  return res.json();
}
