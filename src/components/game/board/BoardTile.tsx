import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GameSelectors from 'store/game/game.selectors'
import GameSlice from 'store/game/game.slice'

import Tile from './tile/Tile'

interface BoardTileProperties {
  tileId: string
}

const BoardTile = ({
  tileId
}: BoardTileProperties) => {

  // Hooks //

  const dispatch = useDispatch()

  const tile = useSelector(GameSelectors.tile(tileId))

  // Events //

  const handleTileClick = () => {
    dispatch(GameSlice.actions.revealCard({ tileId }))
  }

  // Rendering //

  return (
    <Tile
      {...tile}
      onClick={handleTileClick}
    />
  )
}

export default BoardTile