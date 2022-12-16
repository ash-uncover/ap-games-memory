import React from 'react'
import { useSelector } from 'react-redux'
// Store
import GameSelectors from 'store/game/game.selectors'
// Libs
// Components
import BoardTile from 'components/game/board/BoardTile'
import { SquareGrid } from '@uncover/games-common'

import './Board.css'

const Board = ({

}) => {

  // Hooks //

  const tiles = useSelector(GameSelectors.boardTiles)

  // Events //

  // Rendering //

  const renderTile = (tileId: string) => {
    return (
      <BoardTile
        key={tileId}
        tileId={tileId}
      />
    )
  }

  return (
    <div className='board'>
      <SquareGrid>
        {tiles.map(renderTile)}
      </SquareGrid>
    </div>
  )
}

export default Board