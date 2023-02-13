// Game Status //

export type GameStatus =
  'GAME_NOT_STARTED' |
  'GAME_LOADING' |
  'GAME_READY' |
  'GAME_ON_GOING' |
  'GAME_ENDED_VICTORY' |
  'GAME_ENDED_DEFEAT'
export const GameStatuses: {
  GAME_NOT_STARTED: GameStatus
  GAME_LOADING: GameStatus
  GAME_READY: GameStatus
  GAME_ON_GOING: GameStatus
  GAME_ENDED_VICTORY: GameStatus
  GAME_ENDED_DEFEAT: GameStatus
} = {
  GAME_NOT_STARTED: 'GAME_NOT_STARTED',
  GAME_LOADING: 'GAME_LOADING',
  GAME_READY: 'GAME_READY',
  GAME_ON_GOING: 'GAME_ON_GOING',
  GAME_ENDED_VICTORY: 'GAME_ENDED_VICTORY',
  GAME_ENDED_DEFEAT: 'GAME_ENDED_DEFEAT'
}

// Game Size settings //

export const CARDS_MIN = 2
export const CARDS_DEFAULT = 10
export const CARDS_MAX = 40