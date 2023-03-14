import { useState } from 'react';

import { base } from './ToggleButton.css.ts'

export default function ToggleButton() {

  // Setup toggle state
  const [isActive, setActive] = useState(false)

  // Render template
  return (
    <button
      className={ base }
      onClick={ () => setActive(!isActive) }>
      Click Me ({ isActive ? 'Artice' : 'Inactive' })
    </button>
  )
}

