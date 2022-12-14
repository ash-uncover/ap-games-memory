export type GameDifficulty =
  'easy' |
  'medium' |
  'hard'

export const GameDifficulties: {
  EASY: GameDifficulty
  MEDIUM: GameDifficulty
  HARD: GameDifficulty
} = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
}

export type GameStatus =
  'GAME_NOT_STARTED' |
  'GAME_READY' |
  'GAME_ON_GOING' |
  'GAME_ENDED_VICTORY' |
  'GAME_ENDED_DEFEAT'
export const GameStatuses: {
  GAME_NOT_STARTED: GameStatus
  GAME_READY: GameStatus
  GAME_ON_GOING: GameStatus
  GAME_ENDED_VICTORY: GameStatus
  GAME_ENDED_DEFEAT: GameStatus
} = {
  GAME_NOT_STARTED: 'GAME_NOT_STARTED',
  GAME_READY: 'GAME_READY',
  GAME_ON_GOING: 'GAME_ON_GOING',
  GAME_ENDED_VICTORY: 'GAME_ENDED_VICTORY',
  GAME_ENDED_DEFEAT: 'GAME_ENDED_DEFEAT'
}