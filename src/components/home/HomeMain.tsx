import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// Store
import AppSelectors from 'store/app/app.selectors'
// Services
import MessageService from 'services/message.service'
// Libs
import { ShortcutManager, Shortcuts } from '@uncover/games-common'
// Components
import HomeMenu from './HomeMenu'

import './Home.css'

const HomeMain = () => {

  // Hooks //

  const navigate = useNavigate()

  const embedded = useSelector(AppSelectors.embedded)

  useEffect(() => {
    const shortcuts: Shortcuts = {
      id: 'home-main-shortcuts',
      priority: 1,
      shortcuts: [
        { code: 'KeyN', callback: handleNew },
        { code: 'KeyS', callback: handleSettings },
        { code: 'KeyE', callback: handleExit },
      ]
    }
    return ShortcutManager.addShortcuts(shortcuts)
  })

  // Events //

  const handleNew = () => {
    navigate('new')
  }

  const handleSettings = () => {
    navigate('settings')
  }

  const handleExit = () => {
    MessageService.sendMessage({
      type: 'exitGame',
      payload: null
    })
  }

  // Rendering //

  return (
    <HomeMenu
      title='AP Memory'
      items={[
        { text: 'New', onClick: handleNew },
        { text: 'Settings', onClick: handleSettings },
        { text: 'Exit', onClick: handleExit },
      ]}
    />
  )
}

export default HomeMain