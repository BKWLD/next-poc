import { style, styleVariants } from '@vanilla-extract/css';
import { lighten } from 'polished'

const breakpoint = 768,
  teal = '#23485f'

const buttonBase = style({
  appearance: 'none',
  color: 'white',
  padding: 15,
  border: 'none',
  '@media': {
    [`(min-width: ${breakpoint + 1}px)`]: {
      fontSize: '1.25em',
    },
    [`(max-width: ${breakpoint}px)`]: {
      padding: 10,
    }
  }
})

export const buttonStyles = styleVariants({

  inactive: [buttonBase, {
    background: 'black',
    ':hover': {
      background: lighten(.1, 'black'),
    }
  }],

  // It would have been nice to style with deep selector here
  active: [buttonBase, {
    background: teal,
    fontWeight: 'bold',
    ':hover': {
      background: lighten(.1, teal),
    }
  }]
})

const textBase = style({
  transition: 'transform .2s ease-out',
  display: 'inline-block',
})

export const textStyles = styleVariants({
  inactive: [textBase],
  active: [textBase, {
    transform: 'scale(1.1) rotate(2deg)',
  }]
})
