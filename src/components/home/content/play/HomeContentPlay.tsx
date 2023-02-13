import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
// Store
import GameSlice from 'store/game/game.slice'
// Libs
import {
  CARDS_MAX,
  CARDS_MIN
} from 'lib/game/constants'
// Components
import {
  Panel,
  PanelButton,
  ShortcutManager,
  Shortcuts,
  Slider
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

  const handleSizeSelected = (size: number) => {
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
          <Slider
            label={t('home.play.size.slider.title')}
            min={CARDS_MIN}
            max={CARDS_MAX}
            value={size}
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