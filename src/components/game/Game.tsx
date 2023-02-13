import React from 'react'
// Hooks
import { useSelector } from 'react-redux'
import { useThemeCards, useThemeMusics } from 'lib/game/board/theme.helper'
// Store
import GameSelectors from 'store/game/game.selectors'
// Libs
import { GameStatuses } from 'lib/game/constants'
// Components
import { Navigate } from 'react-router-dom'
import { GameLoading } from './GameLoading'
import { GamePlaying } from './GamePlaying'
import { Dialogs } from './dialogs/Dialogs'
// Styles
import './Game.css'

const Game = ({ }) => {

  // Hooks //

  const status = useSelector(GameSelectors.status)

  const audios = useThemeMusics()
  const images = useThemeCards()


  // Rendering //

  const renderGame = () => {
    switch (status) {
      case GameStatuses.GAME_NOT_STARTED: {
        return <Navigate to='/' />
      }
      case GameStatuses.GAME_LOADING: {
        return (
          <GameLoading
            images={images}
            audios={audios}
          />
        )
      }
      case GameStatuses.GAME_READY:
      case GameStatuses.GAME_ON_GOING:
      case GameStatuses.GAME_ENDED_DEFEAT:
      case GameStatuses.GAME_ENDED_VICTORY: {
        return (
          <GamePlaying
            audios={audios}
          />
        )
      }
    }
  }

  return (
    <>
      {renderGame()}
      <Dialogs />
    </>
  )
}

export default Game