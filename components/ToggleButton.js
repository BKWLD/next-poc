import { useState } from 'react';

export default function ToggleButton() {

  // Setup toggle state
  const [isActive, setActive] = useState(false)

  // Render template
  return (
    <button onClick={ () => setActive(!isActive) }>
      Click Me ({ isActive ? 'Artice' : 'Inactive' })
    </button>
  )
}
