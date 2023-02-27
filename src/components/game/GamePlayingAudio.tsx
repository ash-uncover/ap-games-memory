// Hooks
import { AudioCategories, useAudioEffect } from '@uncover/games-common'
// Store
// Libs
import CONFIG from 'config'
// Components
// Styles

const GamePlayingAudio = ({ }) => {

  // Hooks //

  useAudioEffect([`${CONFIG.AP_GAMES_MEMORY_PUBLIC}/sound/game.mp3`], {
    category: AudioCategories.MUSIC,
    shufffle: true,
    loop: true
  })

  // Rendering //

  return null
}

export default GamePlayingAudio