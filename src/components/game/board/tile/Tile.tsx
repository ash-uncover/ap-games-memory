import React from 'react'
// Libs
import {
  GameBoardTile
} from 'lib/game/board/tiles/tile.model'

import './Tile.css'

interface TileProperties extends GameBoardTile {
  onClick: () => void
}

const Tile = ({
  src,
  color,
  revealed,
  found,
  onClick
}: TileProperties) => {

  // Events //

  const handleTileClick = () => {
    onClick()
  }

  // Rendering //

  const classes = ['tile']
  if (revealed) {
    classes.push('tile-revealed')
  }
  if (found) {
    classes.push('tile-found')
  }

  return (
    <div
      className={classes.join(' ')}
      style={{
        background: color
      }}
      onClick={handleTileClick}
    >
      <img
        className='tile-image'
        width='100%'
        height='100%'
        src={src}
      />
      <div className='tile-mask tile-mask-top' />
      <div className='tile-mask tile-mask-left' />
      <div className='tile-mask tile-mask-right' />
      <div className='tile-mask tile-mask-bottom' />
    </div>
  )
}

export default Tile
