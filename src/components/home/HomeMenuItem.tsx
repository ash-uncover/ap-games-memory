import React, { MouseEvent } from 'react'
import AudioManager, { AudioFiles } from 'lib/utils/Audio'

import './HomeMenuItem.css'
import { AudioTypes } from '@uncover/games-common'

export interface HomeMenuItemProperties {
  selected?: boolean
  text: string
  onClick: () => void
}

export const HomeMenuItem = ({
  selected,
  text,
  onClick,
}: HomeMenuItemProperties) => {

  // Events //

  const handleClick = (event: MouseEvent) => {
    event.preventDefault()
    AudioManager.play(AudioFiles.menuChange, AudioTypes.INTERFACE)
    onClick()
    return false
  }

  // Rendering //

  const classes = ['home-menu-item']
  if (selected) {
    classes.push('selected')
  }

  return (
    <li
      className={classes.join(' ')}
    >
      <a
        className='home-menu-item__link'
        role='button'
        onClick={handleClick}
      >
        {text}
      </a>
    </li>
  )
}

export default HomeMenuItem