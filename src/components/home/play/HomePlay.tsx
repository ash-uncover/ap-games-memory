import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// Store
import GameSlice from 'store/game/game.slice'
// Libs
import { ShortcutManager, Shortcuts } from '@uncover/games-common'
// Components
import { GameDifficulties } from 'lib/game/constants'

const HomePlay = () => {

  // Hooks //

  const dispatch = useDispatch()
  const navigate = useNavigate()

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
    <>

      <button
        title='New Game'
        onClick={handleStart}
      >
        Start
      </button>
    </>
  )
}

export default HomePlay