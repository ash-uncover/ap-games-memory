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

export type GameSize =
  { id: '4', width: 2, height: 2 } |
  { id: '6', width: 2, height: 3 } |
  { id: '8', width: 2, height: 4 } |
  { id: '12', width: 3, height: 4 } |
  { id: '16', width: 4, height: 4 } |
  { id: '20', width: 4, height: 5 } |
  { id: '24', width: 4, height: 6 } |
  { id: '30', width: 5, height: 6 } |
  { id: '36', width: 6, height: 6 } |
  { id: '42', width: 6, height: 7 } |
  { id: '48', width: 6, height: 8 } |
  { id: '56', width: 7, height: 8 } |
  { id: '64', width: 8, height: 8 } |
  { id: '72', width: 8, height: 9 } |
  { id: '80', width: 8, height: 10 }

export const GameSizes: {
  SIZE_4: GameSize
  SIZE_6: GameSize
  SIZE_8: GameSize
  SIZE_12: GameSize
  SIZE_16: GameSize
  SIZE_20: GameSize
  SIZE_24: GameSize
  SIZE_30: GameSize
  SIZE_36: GameSize
  SIZE_42: GameSize
  SIZE_48: GameSize
  SIZE_56: GameSize
  SIZE_64: GameSize
  SIZE_72: GameSize
  SIZE_80: GameSize
} = {
  SIZE_4: { id: '4', width: 2, height: 2 },
  SIZE_6: { id: '6', width: 2, height: 3 },
  SIZE_8: { id: '8', width: 2, height: 4 },
  SIZE_12: { id: '12', width: 3, height: 4 },
  SIZE_16: { id: '16', width: 4, height: 4 },
  SIZE_20: { id: '20', width: 4, height: 5 },
  SIZE_24: { id: '24', width: 4, height: 6 },
  SIZE_30: { id: '30', width: 5, height: 6 },
  SIZE_36: { id: '36', width: 6, height: 6 },
  SIZE_42: { id: '42', width: 6, height: 7 },
  SIZE_48: { id: '48', width: 6, height: 8 },
  SIZE_56: { id: '56', width: 7, height: 8 },
  SIZE_64: { id: '64', width: 8, height: 8 },
  SIZE_72: { id: '72', width: 8, height: 9 },
  SIZE_80: { id: '80', width: 8, height: 10 },
}

export const getSize = (sizeId: string) => {
  return Object.values(GameSizes).find(size => size.id === sizeId)
}
