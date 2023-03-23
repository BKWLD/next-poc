import { useState } from 'react';
import clsx from 'clsx'

export default function ToggleButton() {

  // Setup toggle state
  const [isActive, setActive] = useState(false)

  // Render template
  return (
    <button
      onClick={ () => setActive(!isActive) }
      className={clsx([
        'px-2 md:px-4 py-1 md:py-2',
        'border-0 apperance-none',
        'text-white md:text-lg',
        isActive ?
          'bg-teal hover:bg-teal-light' :
          'bg-black hover:bg-black-light',
      ])}>

      {/* The text inside the button */}
      <span className={clsx([
        'inline-block transition-transform',
        { 'scale-110 rotate-2': isActive }
      ])}>
        Click Me ({ isActive ? 'Active' : 'Inactive' })
      </span>

    </button>
  )
}
