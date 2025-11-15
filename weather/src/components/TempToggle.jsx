import React from 'react'


export default function TempToggle({ unit, setUnit }) {
return (
<div className="temp-toggle">
<button
className={unit === 'C' ? 'active' : ''}
onClick={() => setUnit('C')}
>
°C
</button>
<button
className={unit === 'F' ? 'active' : ''}
onClick={() => setUnit('F')}
>
°F
</button>
</div>
)
}