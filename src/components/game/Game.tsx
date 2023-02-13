import React from 'react'
// Hooks
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useWardProviders } from '@uncover/ward-react'
import { useTheme, useThemeCards, useThemeMusics } from 'lib/game/board/board.helper'
// Store
import GameSelectors from 'store/game/game.selectors'
import GameSlice from 'store/game/game.slice'
// Libs
import { GameStatuses } from 'lib/game/constants'
// Components
import Board from 'components/game/board/Board'
import { GameLoading } from './GameLoading'
import { GamePlaying } from './GamePlaying'
// Libs

import './Game.css'
import { Dialogs } from './dialogs/Dialogs'

const Game = ({ }) => {

  // Hooks //

  const status = useSelector(GameSelectors.status)

  const audios = useThemeMusics()
  const images = useThemeCards()


  // Rendering //

  /*
  if (status === GameStatuses.GAME_NOT_STARTED) {
    return (
      <Navigate to='/' />
    )
  }

  return (
    <div className='game'>
      <div className='game-header'>
        {`Error: ${errors}`}
        {`Found: ${revealed}`}
      </div>
      <div
        className='game-area'
        style={{ position: 'relative' }}
      >
        <Board />
      </div>
      <div className='game-footer'>
        footer
      </div>
      {status === GameStatuses.GAME_ENDED_VICTORY ?
        <div className='game-layer'>
          <div className='game-dialog'>
            VICTORY
            <button
              onClick={handleGameEnd}
            >
              Return to Main Menu
            </button>
          </div>
        </div>
        : null}
    </div>
  )
  */

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