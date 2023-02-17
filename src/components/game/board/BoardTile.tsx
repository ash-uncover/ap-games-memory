import React from 'react'
// Hooks
import { useDispatch, useSelector } from 'react-redux'
// Store
import GameSelectors from 'store/game/game.selectors'
import GameSlice from 'store/game/game.slice'
// Styles
import './BoardTile.css'
import { useTheme, useThemeCardBack } from 'lib/game/board/theme.helper'

interface BoardTileProperties {
  tileId: string
}

const BoardTile = ({
  tileId
}: BoardTileProperties) => {

  // Hooks //

  const dispatch = useDispatch()

  const tile = useSelector(GameSelectors.tile(tileId))
  const cardBack = useThemeCardBack()

  // Events //

  const handleTileClick = () => {
    dispatch(GameSlice.actions.revealCard({ tileId }))
  }

  // Rendering //

  const classes = ['board-tile']
  if (tile.revealed) {
    classes.push('board-tile--revealed')
  }
  if (tile.found) {
    classes.push('board-tile--found')
  }

  return (
    <div
      className={classes.join(' ')}
      onClick={handleTileClick}
      style={{
        backgroundImage: `url(${cardBack})`
      }}
    >
      <img
        className='board-tile__image'
        draggable={false}
        width='101%'
        height='101%'
        src={tile.src}
      />
    </div>
  )
}

export default BoardTile