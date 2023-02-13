import React from 'react'
// Style
import './ThemeTile.css'

export interface ThemeTileProperties {
  className?: string
  name: string
  title: string
  image: string

  onClick: () => void
}

export const ThemeTile = ({
  className,
  name,
  title,
  image,

  onClick,
}: ThemeTileProperties) => {

  // Events //

  const handleClick = () => {
    onClick()
  }
  // Rendering //

  const classes = ['theme-tile']
  if (className) {
    classes.push(className)
  }

  return (
    <button
      className={classes.join(' ')}
      title={title}
      onClick={handleClick}
    >
      <img
        className='theme-tile__image'
        src={image}
      />
    </button>
  )
}