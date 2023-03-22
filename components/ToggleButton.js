import { useState } from 'react';
import { styled } from '@linaria/react';
import { lighten } from 'polished'

export default function ToggleButton() {

  // Setup toggle state
  const [isActive, setActive] = useState(false)

  // Render template
  return (
    <Button
      isActive={ isActive }
      onClick={ () => setActive(!isActive) }>
      <span>
        Click Me ({ isActive ? 'Active' : 'Inactive' })
      </span>
    </Button>
  )
}

const breakpoint = 768,
  teal = '#23485f'

const Button = styled.button`
  @apply px-4 py-2 border-0 text-white;
  appearance: none;

  background: ${props => props.isActive ? teal : 'black' };
  &:hover {
    background: ${props => lighten(.1, props.isActive ? teal : 'black') };
  }

  @media (min-width: ${breakpoint + 1}px) {
    @apply text-lg;
  }
  @media (max-width: ${breakpoint}px) {
    @apply px-2 py-1;
  }

  /* Not possible in vanilla-extact (though not really a good practice ) */
  > span {
    @apply inline-block transition-transform;
    transform: ${props => props.isActive ? 'scale(1.1) rotate(2deg)' : 'none' };
  }
`
