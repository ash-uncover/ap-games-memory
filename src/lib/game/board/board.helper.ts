import { useWardProvider } from '@uncover/ward-react'
import { useSelector } from 'react-redux'
import GameSelectors from 'store/game/game.selectors'
import { GameState } from 'store/game/game.state'

export const getTile = (
  game: GameState,
  tileId: string,
) => {
  return game.tiles[tileId]
}

