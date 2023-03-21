import { useState } from 'react';

import { buttonStyles, textStyles } from './ToggleButton.css.ts'

export default function ToggleButton() {

  // Setup toggle state
  const [isActive, setActive] = useState(false)

  // Render template
  return (
    <button
      className={ buttonStyles[ isActive ? 'active' : 'inactive' ] }
      onClick={ () => setActive(!isActive) }>
      <span className={ textStyles[ isActive ? 'active' : 'inactive' ] }>
        Click Me ({ isActive ? 'Active' : 'Inactive' })
      </span>
    </button>
  )
}

