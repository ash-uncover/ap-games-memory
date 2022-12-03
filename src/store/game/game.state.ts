import { GameBoardTile } from 'lib/game/board/tiles/tile.model'
import { GameDifficulty, GameStatus } from 'lib/game/constants'

export interface GameState {
  status: GameStatus

  startTime: number
  endTime: number

  errors: number
  revealed: number

  difficulty: GameDifficulty
  board: GameBoardState

  tiles: GameBoardTilesState
}

export interface GameBoardState {
  tiles: string[]
}

export interface GameBoardTilesState {
  [key: string]: GameBoardTile
}
