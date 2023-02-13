import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import {
  GameState,
} from 'store/game/game.state'

import {
  CARDS_DEFAULT,
  CARDS_MAX,
  CARDS_MIN,
  GameStatuses
} from 'lib/game/constants'

import Ward from '@uncover/ward'

// STATE //

const initialState: GameState = {
  size: CARDS_DEFAULT,
  theme: null,
  themeSelected: null,

  status: GameStatuses.GAME_NOT_STARTED,

  startTime: 0,
  endTime: 0,

  errors: 0,
  revealed: 0,

  board: { tiles: [] },
  tiles: {},

  dialog: null,
  dialogParams: null,
}

// REDUCERS //

const setSize: CaseReducer<GameState, PayloadAction<number>> = (state, action) => {
  state.size = Math.min(CARDS_MAX, Math.max(CARDS_MIN, action.payload))
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
  state.status = GameStatuses.GAME_READY
}

const gameStart: CaseReducer<GameState, PayloadAction<void>> = (state, action) => {
  const aThemes = Ward.data.providers['memory/theme']
  console.log(aThemes)
  /*
  const allCards: Card[] = Object.values(Cards)
  const baseCards: Card[] = ArrayUtils.randomSubArray<Card>(allCards, state.size)
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
  */

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
    if (revealedTiles.length === 1) {
      if (revealedTiles[0].src === tile.src) {
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
