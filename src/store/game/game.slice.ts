import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import {
  ArrayUtils,
  UUID
} from '@uncover/js-utils'

import {
  GameState,
} from 'store/game/game.state'

import {
  GameDifficulties,
  GameDifficulty,
  GameStatuses
} from 'lib/game/constants'

import { Cards } from 'lib/data/Data'
import { GameBoardTile } from 'lib/game/board/tiles/tile.model'
import { Card } from 'lib/data/card.helper'

// STATE //

const initialState: GameState = {
  status: GameStatuses.GAME_NOT_STARTED,
  difficulty: GameDifficulties.EASY,
  startTime: 0,
  endTime: 0,

  errors: 0,
  revealed: 0,

  board: { tiles: [] },
  tiles: {},
}

// REDUCERS //

interface StartGamePayload {
  difficulty: GameDifficulty
}
const startGame: CaseReducer<GameState, PayloadAction<StartGamePayload>> = (state, action) => {
  const {
    difficulty
  } = action.payload

  const nbCards = 8
  const allCards: Card[] = Object.values(Cards)
  const baseCards: Card[] = ArrayUtils.randomSubArray<Card>(allCards, nbCards)
  const chosenCards: Card[] = ArrayUtils.shuffle<Card>([...baseCards, ...baseCards])

  chosenCards.forEach((card: Card) => {
    const tile: GameBoardTile = {
      id: `tile-${UUID.next()}`,
      card: card.id,
      revealed: false,
      found: false
    }
    state.tiles[tile.id] = tile
    state.board.tiles.push(tile.id)
  })

  state.startTime = new Date().getTime()
  state.difficulty = difficulty
  state.status = GameStatuses.GAME_ON_GOING
}

interface RevealCardPayload {
  tileId: string
}
const revealCard: CaseReducer<GameState, PayloadAction<RevealCardPayload>> = (state, action) => {
  const { tileId } = action.payload
  const tile = state.tiles[tileId]
  const revealedTiles = Object.values(state.tiles).filter(tile => tile.revealed && !tile.found)
  if (!tile.found && !tile.revealed && revealedTiles.length < 2) {
    tile.revealed = true
    if (revealedTiles.length === 1) {
      if (revealedTiles[0].card === tile.card) {
        revealedTiles[0].found = true
        revealedTiles[0].revealed = false
        tile.found = true
        tile.revealed = false
        state.revealed++
        if (state.revealed === state.board.tiles.length / 2) {
          state.status = GameStatuses.GAME_ENDED_VICTORY
          state.endTime = new Date().getTime()
        }
      } else {
        state.errors++
      }
    }
  }
}

const unrevealCards: CaseReducer<GameState, PayloadAction<void>> = (state, action) => {
  Object.values(state.tiles).forEach((tile) => {
    if (tile.revealed) {
      tile.revealed = false
    }
  })
}

const endGame: CaseReducer<GameState, PayloadAction<void>> = (state, action) => {
  Object.assign(state, initialState)
}

// SLICE //

const GameSlice = createSlice({
  name: 'game',
  initialState,

  reducers: {
    startGame,

    revealCard,
    unrevealCards,

    endGame,
  },
})

export default GameSlice
