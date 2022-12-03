import { ArrayUtils } from '@uncover/js-utils'

export interface Shortcuts {
  id: string
  priority: number
  shortcuts: Shortcut[]
}

export interface ShortcutMap {
  [key: string]: Shortcut
}

export interface ShortcutId {
  code: string
  altKey?: boolean
  ctrlKey?: boolean
  shiftKey?: boolean
}

export interface Shortcut extends ShortcutId {
  down?: boolean
  priority?: number
  callback: () => void
}

let SHORTCUTS_DOWN: ShortcutMap = {}
let SHORTCUTS_UP: ShortcutMap = {}

let SHORTCUTS_SETS: Shortcuts[] = []

document.addEventListener('keydown', (event: KeyboardEvent) => {
  const shortcutId = getShortcutId(event)
  const shortcut = SHORTCUTS_DOWN[shortcutId]
  if (shortcut) {
    shortcut.callback()
  }
})

document.addEventListener('keyup', (event: KeyboardEvent) => {
  const shortcutId = getShortcutId(event)
  const shortcut = SHORTCUTS_UP[shortcutId]
  if (shortcut) {
    shortcut.callback()
  }
})


export const getShortcutId = (shortcut: ShortcutId) => {
  return `${shortcut.code}-${Boolean(shortcut.altKey)}-${Boolean(shortcut.ctrlKey)}-${Boolean(shortcut.shiftKey)}`
}
export const updateShortcuts = () => {
  SHORTCUTS_DOWN = SHORTCUTS_SETS.reduce((acc:ShortcutMap, shortcutSet: Shortcuts) => {
    shortcutSet.shortcuts.forEach((shortcut) => {
      if (shortcut.down) {
        const shortcutId = getShortcutId(shortcut)
        const currentShortcut = acc[shortcutId]
        if (!currentShortcut || (currentShortcut.priority && currentShortcut.priority < shortcutSet.priority)) {
          acc[shortcutId] = shortcut
        }
      }
    })
    return acc
  }, {})
  SHORTCUTS_UP = SHORTCUTS_SETS.reduce((acc:ShortcutMap, shortcutSet: Shortcuts) => {
    shortcutSet.shortcuts.forEach((shortcut) => {
      if (!shortcut.down) {
        const shortcutId = getShortcutId(shortcut)
        const currentShortcut = acc[shortcutId]
        if (!currentShortcut || (currentShortcut.priority && currentShortcut.priority < shortcutSet.priority)) {
          acc[shortcutId] = shortcut
        }
      }
    })
    return acc
  }, {})
}

const ShortcutManager = {
  addShortcuts: (shortcuts: Shortcuts) => {
    ShortcutManager.removeShortcuts(shortcuts.id, false)
    SHORTCUTS_SETS.push(shortcuts)
    updateShortcuts()
  },
  removeShortcuts: (id: string, update?: boolean) => {
    const set = SHORTCUTS_SETS.find(set => set.id === id)
    SHORTCUTS_SETS = ArrayUtils.removeElement(SHORTCUTS_SETS, set)
    if (update !== false) {
      updateShortcuts()
    }
  },
  reset: () => {
    SHORTCUTS_DOWN = {}
    SHORTCUTS_UP = {}
    SHORTCUTS_SETS.length = 0
  }
}

export default ShortcutManager