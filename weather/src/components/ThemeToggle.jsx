import React from 'react'


export default function ThemeToggle({ theme, setTheme }) {
return (
<button
className="theme-toggle"
onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
aria-label="Toggle theme"
>
{theme === 'light' ? '🌙 Dark' : '☀️ Light'}
</button>
)
}