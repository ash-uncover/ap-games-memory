import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Store
import GameSelectors from 'store/game/game.selectors'
import GameSlice from 'store/game/game.slice'
// Libs
import AudioManager, { AudioFiles, AudioTypes } from 'lib/utils/AudioManager'
import { GameStatuses } from 'lib/game/constants'
import ShortcutManager, { Shortcuts } from 'lib/utils/ShortcutManager'
// Components
import BoardTile from 'components/game/board/BoardTile'

import './Board.css'
import SquareGrid from 'components/commons/grid/SquareGrid'

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