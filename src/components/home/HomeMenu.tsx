import React from 'react'

import HomeMenuItem, { HomeMenuItemProperties } from './HomeMenuItem'

import './HomeMenu.css'

interface HomeMenuProperties {
  title?: string,
  items: HomeMenuItemProperties[]
}
const HomeMenu = ({
  title,
  items,
}: HomeMenuProperties) => {

  // Rendering //

  return (
    <div
      className='home-menu'
    >
      {title ?
        <h1>
          {title}
        </h1>
        : null}
      <nav>
        <ul
          className='home-menu__list'
        >
          {items.map(item => <HomeMenuItem key={item.text} {...item} />)}
        </ul>
      </nav>
    </div>
  )
}

export default HomeMenu