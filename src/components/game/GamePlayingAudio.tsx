// Hooks
import { AudioCategories, useAudioEffect } from '@uncover/games-common'
// Store
// Libs
import CONFIG from 'config'
import { useSelector } from 'react-redux'
import GameSelectors from 'store/game/game.selectors'
// Components
// Styles

export interface GamePlayingAudioProperties {
  audios: string[]
}

const GamePlayingAudio = ({
  audios
}: GamePlayingAudioProperties) => {

  // Hooks //

  useAudioEffect(audios, {
    category: AudioCategories.MUSIC,
    shufffle: true,
    loop: true
  })

  // Rendering //

  return null
}

export default GamePlayingAudio