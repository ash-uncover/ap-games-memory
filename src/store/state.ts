import AppState from 'store/app/app.state'
import { DisplayState } from 'store/display/display.state'
import { GameState } from 'store/game/game.state'

export type RootState = {
  app: AppState,
  display: DisplayState,
  game: GameState,
}