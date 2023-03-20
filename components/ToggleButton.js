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
  appearance: none;
  color: white;
  padding: 15px;
  border: none;

  background: ${props => props.isActive ? teal : 'black' };
  &:hover {
    background: ${props => lighten(.1, props.isActive ? teal : 'black') };
  }

  @media (min-width: ${breakpoint + 1}px) {
    font-size: 1.25em;
  }
  @media (max-width: ${breakpoint}px) {
    padding: 10px;
  }

  /* Not possible in vanilla-extact (though not really a good practice ) */
  > span {
    display: inline-block;
    transition: transform .2s ease-out;
    transform: ${props => props.isActive && 'scale(1.1) rotate(2deg)' };
  }
`
