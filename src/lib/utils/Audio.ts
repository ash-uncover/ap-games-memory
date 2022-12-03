import { AudioManager } from '@uncover/games-common'
import CONFIG from 'config'

export const AudioFiles = {
  home: '/sound/home.mp3',
  game: '/sound/game.mp3',
  menuChange: '/sound/menu_change.mp3',
  step: '/sound/step.mp3',
}

export const Audio = new AudioManager(CONFIG.AP_GAMES_MEMORY_PUBLIC)

export default Audio