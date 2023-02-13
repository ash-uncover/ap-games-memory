import React from 'react'
// Hooks
import { useDispatch, useSelector } from 'react-redux'
// Store
import GameSelectors from 'store/game/game.selectors'
import GameSlice from 'store/game/game.slice'
// Styles
import './BoardTile.css'

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
      style={{
        background: tile.color
      }}
      onClick={handleTileClick}
    >
      <img
        className='board-tile__image'
        width='100%'
        height='100%'
        src={tile.src}
      />
      <div className='board-tile__mask board-tile__mask-top' />
      <div className='board-tile__mask board-tile__mask-left' />
      <div className='board-tile__mask board-tile__mask-right' />
      <div className='board-tile__mask board-tile__mask-bottom' />
    </div>
  )
}

export default BoardTile