import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
// Store
import GameSlice from 'store/game/game.slice'
// Libs
import {
  GameDifficulties
} from 'lib/game/constants'
// Components
import {
  Panel,
  PanelButton,
  ShortcutManager,
  Shortcuts
} from '@uncover/games-common'

import './HomeContentPlay.css'

export interface HomeContentPlayProperties {

}

export const HomeContentPlay = ({

}: HomeContentPlayProperties) => {

  // Hooks //

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [difficulty, setDifficulty] = useState(GameDifficulties.MEDIUM)

  useEffect(() => {
    const shortcuts: Shortcuts = {
      id: 'home-new-shortcuts',
      priority: 1,
      shortcuts: [
        { code: 'KeyS', callback: handleStart },
        { code: 'Escape', callback: handleBack },
      ]
    }
    return ShortcutManager.addShortcuts(shortcuts)
  })

  // Events //

  const handleStart = () => {
    dispatch(GameSlice.actions.startGame({
      difficulty
    }))
    navigate('/game')
  }

  const handleBack = () => {
    navigate('/')
  }

  // Rendering //

  return (
    <div className='home-play'>

      <div className='home-play__scroll-area'>

        <Panel>
          <h2>
            {t('home.play.title')}
          </h2>
        </Panel>

        <PanelButton
          className='home-play__main-action'
          title={t('home.play.start.tooltip')}
          onClick={handleStart}
        >
          {t('home.play.start.text')}
        </PanelButton>

      </div>
    </div>
  )
}

export default HomeContentPlay