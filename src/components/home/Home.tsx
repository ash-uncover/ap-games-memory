import React, { ReactNode, useEffect } from 'react'
import { AudioTypes, ShortcutManager, Shortcuts } from '@uncover/games-common'
// Libs
import AudioManager, { AudioFiles } from 'lib/utils/Audio'

import './Home.css'

interface HomeProperties {
  children: ReactNode
}
const Home = ({
  children
}: HomeProperties) => {

  // Hooks //

  useEffect(() => {
    AudioManager.play(AudioFiles.home, AudioTypes.MUSIC)
    return () => {
      AudioManager.stop(AudioFiles.home)
    }
  }, [])

  useEffect(() => {
    const shortcuts: Shortcuts = {
      id: 'home-shortcuts',
      priority: 1,
      shortcuts: []
    }
    ShortcutManager.addShortcuts(shortcuts)
  }, [])

  // Rendering //

  return (
    <div className='home'>
      <div className='layer layer-background' />
      <div className='layer layer-opacity'>
        <span
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            color: 'darkgrey',
            margin: '1rem',
            fontStyle: 'italic',
            fontSize: '0.75rem',
          }}
        >
          @uncover 2023
        </span>
      </div>
      <div className='layer layer-content'>
        {children}
      </div>
    </div>
  )
}

export default Home