import React from 'react'
import { createRoot } from 'react-dom/client'

import {
  Provider
} from 'react-redux'

import {
  HashRouter as Router
} from 'react-router-dom'

// Import translation module
import 'lib/utils/i18n'

// Should be imported before first access to the reducers
import store from 'store'

// Import components
import Root from 'routes/__layout'
import { ShortcutManager } from '@uncover/games-common'

ShortcutManager.reset()

const containerRoot = document.getElementById('reactroot')!
const root = createRoot(containerRoot)

root.render(
  <Provider store={store}>
    <Router>
      <Root />
    </Router>
  </Provider>
)
