import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
// Store
import GameSlice from 'store/game/game.slice'
// Libs
import {
  GameSizes
} from 'lib/game/constants'
// Components
import {
  Panel,
  PanelButton,
  Select,
  ShortcutManager,
  Shortcuts,
} from '@uncover/games-common'
// Styles
import './HomeContentPlay.css'
import GameSelectors from 'store/game/game.selectors'
import { ThemeTiles } from './ThemeTiles'

export interface HomeContentPlayProperties {

}

export const HomeContentPlay = ({

}: HomeContentPlayProperties) => {

  // Hooks //

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const size = useSelector(GameSelectors.size)

  const sizes = Object.values(GameSizes).map(size => {
    return {
      id: size.id,
      text: t('home.play.size.text', { number: size.width * size.height})
    }
  })

  useEffect(() => {
    const shortcuts: Shortcuts = {
      id: 'home-new-shortcuts',
      priority: 1,
      shortcuts: [
        { code: 'KeyS', callback: handleGameLaunch },
        { code: 'Escape', callback: handleBack },
      ]
    }
    return ShortcutManager.addShortcuts(shortcuts)
  })

  // Events //

  const handleSizeSelected = (size: string) => {
    dispatch(GameSlice.actions.setSize(size))
  }

  const handleGameLaunch = () => {
    dispatch(GameSlice.actions.gameLaunch())
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

        <Panel title={t('home.play.size.title')}>
          <Select
            value={size.id}
            values={sizes}
            onChange={handleSizeSelected}
          />
        </Panel>

        <Panel title={t('home.settings.general.theme.title')}>
          <ThemeTiles />
        </Panel>

      </div>

      <PanelButton
        className='home-play__main-action'
        title={t('home.play.start.tooltip')}
        onClick={handleGameLaunch}
      >
        {t('home.play.start.text')}
      </PanelButton>

    </div>
  )
}

export default HomeContentPlay