import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
// Store
import GameSelectors from 'store/game/game.selectors'
import GameSlice from 'store/game/game.slice'
// Libs
import { GameStatuses } from 'lib/game/constants'
// Components
import Board from 'components/game/board/Board'
// Libs

import './Game.css'
import { AudioCategories, useAudioEffect } from '@uncover/games-common'
import CONFIG from 'config'

const Game = ({ }) => {

  // Hooks //

  const dispatch = useDispatch()

  const status = useSelector(GameSelectors.status)

  const errors = useSelector(GameSelectors.errors)
  const revealed = useSelector(GameSelectors.revealed)

  useAudioEffect([`${CONFIG.AP_GAMES_MEMORY_PUBLIC}/sound/game.mp3`], {
    category: AudioCategories.MUSIC,
    shufffle: true,
    loop: true
  })

  useEffect(() => {
    if (errors > 0) {
      setTimeout(() => dispatch(GameSlice.actions.unrevealCards()), 1000)
    }
  }, [errors])

  useEffect(() => {
    dispatch(GameSlice.actions.unrevealCards())
  }, [revealed])

  // Events //

  const handleEndGame = () => {
    dispatch(GameSlice.actions.endGame())
  }

  // Rendering //

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
              onClick={handleEndGame}
            >
              Return to Main Menu
            </button>
          </div>
        </div>
        : null}
    </div>
  )
}

export default Game