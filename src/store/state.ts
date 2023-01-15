import AppState from 'store/app/app.state'
import { AudioState } from 'store/audio/audio.state'
import { DisplayState } from 'store/display/display.state'
import { GameState } from 'store/game/game.state'

export type RootState = {
  app: AppState,
  audio: AudioState,
  display: DisplayState,
  game: GameState,
}