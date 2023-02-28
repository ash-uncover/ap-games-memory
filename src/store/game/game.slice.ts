import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import {
  GameState,
} from 'store/game/game.state'

import {
  GameSizes,
  GameStatuses,
  getSize
} from 'lib/game/constants'

import Ward from '@uncover/ward'
import { ArrayUtils, UUID } from '@uncover/js-utils'
import { getThemeCards, getThemeColors } from 'lib/game/board/theme.helper'

// STATE //

const initialState: GameState = {
  size: GameSizes.SIZE_20,
  theme: null,
  themeSelected: null,

  status: GameStatuses.GAME_NOT_STARTED,

  startTime: 0,
  endTime: 0,

  errors: 0,
  revealed: 0,
  found: 0,

  board: { tiles: [] },
  tiles: {},

  dialog: null,
  dialogParams: null,
}

// REDUCERS //

const setSize: CaseReducer<GameState, PayloadAction<string>> = (state, action) => {
  state.size = getSize(action.payload) || GameSizes.SIZE_20
}

interface SetThemePayload {
  theme: string
  themeSelected: string
}
const setTheme: CaseReducer<GameState, PayloadAction<SetThemePayload>> = (state, action) => {
  state.theme = action.payload.theme
  state.themeSelected = action.payload.themeSelected
}

const gameLaunch: CaseReducer<GameState, PayloadAction<void>> = (state, action) => {
  state.status = GameStatuses.GAME_LOADING
}

const gameReady: CaseReducer<GameState, PayloadAction<void>> = (state, action) => {
  const theme = Ward.data.providers[state.theme]
  const allCards = getThemeCards(theme)
  const allColors = getThemeColors(theme)
  const nbCards = state.size.width * state.size.height / 2
  const baseCards = ArrayUtils.randomSubArray(allCards, nbCards).map((cardUrl) => ({
    src: cardUrl,
    color: ArrayUtils.randomElement(allColors)
  }))
  const chosenCards = ArrayUtils.shuffle([...baseCards, ...baseCards])

  chosenCards.forEach((card: { src: string, color: string }) => {
    const tile = {
      id: `tile-${UUID.next()}`,
      src: card.src,
      color: card.color,
      revealed: false,
      found: false
    }
    state.tiles[tile.id] = tile
    state.board.tiles.push(tile.id)
  })

  state.status = GameStatuses.GAME_READY
}

const gameStart: CaseReducer<GameState, PayloadAction<void>> = (state, action) => {
  state.startTime = new Date().getTime()
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
    state.revealed++
    if (revealedTiles.length === 1) {
      if (revealedTiles[0].src === tile.src) {
        revealedTiles[0].found = true
        revealedTiles[0].revealed = false
        tile.found = true
        tile.revealed = false
        state.found++
        if (state.found === state.board.tiles.length / 2) {
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
  state.revealed = 0
}

const gameEnd: CaseReducer<GameState, PayloadAction<void>> = (state, action) => {
  Object.assign(state, {
    ...initialState,
    size: state.size,
    theme: state.theme,
  })
}

type PayloadDialog = {
  dialog: string | null,
  params?: any,
}
const openDialog: CaseReducer<GameState, PayloadAction<PayloadDialog>> = (state, action) => {
  const {
    dialog,
    params,
  } = action.payload
  state.dialog = dialog
  state.dialogParams = params
}
const closeDialog: CaseReducer<GameState, PayloadAction<void>> = (state, action) => {
  state.dialog = null
  state.dialogParams = null
}

// SLICE //

const GameSlice = createSlice({
  name: 'game',
  initialState,

  reducers: {
    setSize,
    setTheme,

    gameLaunch,
    gameReady,
    gameStart,

    revealCard,
    unrevealCards,

    gameEnd,

    openDialog,
    closeDialog,
  },
})

export default GameSlice
