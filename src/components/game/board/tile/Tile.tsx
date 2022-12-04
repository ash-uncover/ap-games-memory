import React from 'react'
// Libs
import CONFIG from 'config'
import { Cards } from 'lib/data'
import { GameBoardTile } from 'lib/game/board/tiles/tile.model'

import './Tile.css'

interface TileProperties extends GameBoardTile {
  onClick: () => void
}

const Tile = ({
  card,
  revealed,
  found,
  onClick
}: TileProperties) => {

  // Events //

  const handleTileClick = () => {
    onClick()
  }

  // Rendering //

  const cardData = Cards[card]

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
        background: cardData.color
      }}
      onClick={handleTileClick}
    >
      <img
        className='tile-image'
        width='100%'
        height='100%'
        src={`${CONFIG.AP_GAMES_MEMORY_PUBLIC}/images/cards/${cardData.src}`}
      />
      <div className='tile-mask tile-mask-top' />
      <div className='tile-mask tile-mask-left' />
      <div className='tile-mask tile-mask-right' />
      <div className='tile-mask tile-mask-bottom' />
    </div>
  )
}

export default Tile