import { GameBoardTile } from 'lib/game/board/tiles/tile.model'
import { GameStatus } from 'lib/game/constants'

export interface GameState {
  size: number
  theme: string
  themeSelected: string

  status: GameStatus

  startTime: number
  endTime: number

  errors: number
  revealed: number

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
