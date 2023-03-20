import { useState } from 'react';

export default function ToggleButton() {

  // Setup toggle state
  const [isActive, setActive] = useState(false)

  // Render template
  return (
    <button
      onClick={ () => setActive(!isActive) }>
      <span>
        Click Me ({ isActive ? 'Active' : 'Inactive' })
      </span>
    </button>
  )
}
