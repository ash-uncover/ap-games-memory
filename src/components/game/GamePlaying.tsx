import React, { useEffect, useState } from 'react'
// Hooks
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useWardProvider } from '@uncover/ward-react'
// Store
import GameSlice from 'store/game/game.slice'
import GameSelectors from 'store/game/game.selectors'
// Libs
import CONFIG from 'config'
import { GameStatuses } from 'lib/game/constants'
import {
  AudioCategories,
  useAudio,
  useAudioEffect
} from '@uncover/games-common'
// Components
import {
  GameLayout
} from 'components/common/game/GameLayout'
import {
  GameFooterAction
} from 'components/common/game/GameFooterAction'
import {
  DIALOG
} from './dialogs/Dialogs'
import Board from './board/Board'

let victoryTimeout

export interface GamePlayingProperties {
  audios: string[]
}

export const GamePlaying = ({
  audios
}: GamePlayingProperties) => {

  // Hooks //

  const dispatch = useDispatch()
  const [animate, setAnimate] = useState(false)

  const soundCardRevealed = useAudio([
    `${CONFIG.AP_GAMES_MEMORY_PUBLIC}/sound/click.mp3`,
  ])
  const soundCardMatch = useAudio([
    `${CONFIG.AP_GAMES_MEMORY_PUBLIC}/sound/answer-correct.mp3`,
  ])
  const soundCardMismatch = useAudio([
    `${CONFIG.AP_GAMES_MEMORY_PUBLIC}/sound/answer-error.mp3`,
  ])
  const soundVictory = useAudio([
    `${CONFIG.AP_GAMES_MEMORY_PUBLIC}/sound/gong.mp3`,
  ])

  const { t } = useTranslation()

  const status = useSelector(GameSelectors.status)

  const errors = useSelector(GameSelectors.errors)
  const revealed = useSelector(GameSelectors.revealed)
  const found = useSelector(GameSelectors.found)

  useAudioEffect([`${CONFIG.AP_GAMES_MEMORY_PUBLIC}/sound/game.mp3`], {
    category: AudioCategories.MUSIC,
    shufffle: true,
    loop: true
  })

  useEffect(() => {
    if (errors > 0) {
      soundCardMismatch.stop()
      soundCardMismatch.play()
      setTimeout(() => dispatch(GameSlice.actions.unrevealCards()), 1000)
    }
  }, [errors])

  useEffect(() => {
    if (found > 0) {
      soundCardMatch.stop()
      soundCardMatch.play()
    }
    dispatch(GameSlice.actions.unrevealCards())
  }, [found])

  useEffect(() => {
    if (status === GameStatuses.GAME_ENDED_VICTORY) {
      soundVictory.stop()
      soundVictory.play()
      setAnimate(true)
      victoryTimeout = setTimeout(() => {
        handleVictoryMenu()
      }, 3000)
    }
    return () => {
      clearTimeout(victoryTimeout)
    }
  }, [status])

  const theme = useSelector(GameSelectors.theme)

  const themeObj = useWardProvider(theme)

  useAudioEffect(audios, {
    category: AudioCategories.MUSIC,
    shufffle: true,
    loop: true
  })

  // Events //

  const handleGameStart = () => {
    dispatch(GameSlice.actions.gameStart())
  }

  const handleTileClick = (tileId: string) => {
    switch (status) {
      case GameStatuses.GAME_READY: {
        handleGameStart()
      }
      case GameStatuses.GAME_ON_GOING: {
        if (revealed < 2) {
          soundCardRevealed.stop()
          soundCardRevealed.play()
          dispatch(GameSlice.actions.revealCard({ tileId }))
        }
        break
      }
    }
  }

  const handleEndMenu = () => {
    dispatch(GameSlice.actions.openDialog({ dialog: DIALOG.DEFEAT }))
  }

  const handleVictoryMenu = () => {
    clearTimeout(victoryTimeout)
    dispatch(GameSlice.actions.openDialog({ dialog: DIALOG.VICTORY }))
  }

  // Rendering //

  const renderFooter = () => {
    switch (status) {
      case GameStatuses.GAME_READY: {
        return ([
          <GameFooterAction
            key='start'
            selected={true}
            title={t('game.start.text')}
            onClick={handleGameStart}
          />
        ])
      }
      case GameStatuses.GAME_ON_GOING: {
        return ([
          <GameFooterAction
            key='quit'
            icon={['fas', 'door-open']}
            title=''
            onClick={handleEndMenu}
          />
        ])
      }
      case GameStatuses.GAME_ENDED_DEFEAT: {
        return ([
          <GameFooterAction
            key='quit'
            icon={['fas', 'door-open']}
            title=''
            onClick={handleEndMenu}
          />
        ])
      }
      case GameStatuses.GAME_ENDED_VICTORY: {
        return ([
          <GameFooterAction
            key='quit'
            icon={['fas', 'door-open']}
            title=''
            onClick={handleVictoryMenu}
          />
        ])
      }
      default: {
        return null;
      }
    }
  }

  return (
    <GameLayout
      header={`Memory - ${themeObj ? themeObj.attributes.name : 'Random'}`}
      content={
        <Board
          onTileClick={handleTileClick}
        />
      }
      footer={renderFooter()}
    />
  )
}