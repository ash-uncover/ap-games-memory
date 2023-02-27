import { GameBoardTile } from 'lib/game/board/tiles/tile.model'
import { GameSize, GameStatus } from 'lib/game/constants'

export interface GameState {
  size: GameSize

  theme: string
  themeSelected: string

  status: GameStatus

  startTime: number
  endTime: number

  errors: number
  revealed: number
  found: number

  board: GameBoardState
  tiles: GameBoardTilesState

  dialog: string | null
  dialogParams: any | null
}

export interface GameBoardState {
  tiles: string[]
}

export interface GameBoardTilesState {
  [key: string]: GameBoardTile
}
