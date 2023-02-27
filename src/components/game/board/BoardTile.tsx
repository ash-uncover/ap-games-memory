import React from 'react'
// Hooks
import { useSelector } from 'react-redux'
// Store
import GameSelectors from 'store/game/game.selectors'
// Libs
import { useThemeCardBack } from 'lib/game/board/theme.helper'
// Styles
import './BoardTile.css'

interface BoardTileProperties {
  tileId: string
  onClick: () => void
}

const BoardTile = ({
  tileId,
  onClick
}: BoardTileProperties) => {

  // Hooks //

  const tile = useSelector(GameSelectors.tile(tileId))
  const cardBack = useThemeCardBack()

  // Events //

  const handleTileClick = () => {
    if (!tile.revealed && !tile.found) {
      onClick()
    }
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
