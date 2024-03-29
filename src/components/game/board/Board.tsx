import React from 'react'
import { useSelector } from 'react-redux'
// Store
import GameSelectors from 'store/game/game.selectors'
// Libs
// Components
import BoardTile from 'components/game/board/BoardTile'
import { GridTiles } from '@uncover/games-common'
// Styles
import './Board.css'

interface BoardProperties {
  onTileClick: (tileId: string) => void
}

const Board = ({
  onTileClick
}: BoardProperties) => {

  // Hooks //

  const tiles = useSelector(GameSelectors.boardTiles)
  const size = useSelector(GameSelectors.size)

  // Events //

  const handleTileClick = (tileId: string) => {
    onTileClick(tileId)
  }

  // Rendering //

  const renderTile = (tileId: string) => {
    return (
      <BoardTile
        key={tileId}
        tileId={tileId}
        onClick={() => handleTileClick(tileId)}
      />
    )
  }

  return (
    <div className='board'>
      <GridTiles
        width={size.width}
        height={size.height}
      >
        {tiles.map(renderTile)}
      </GridTiles>
    </div>
  )
}

export default Board