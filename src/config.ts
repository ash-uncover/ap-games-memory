import Logger from '@uncover/js-utils-logger'
const LOGGER = new Logger('CONFIG')

const CONFIG: {
  [key: string]: string
} = {
  AP_GAMES_MEMORY_PUBLIC: ''
}

// Load config from env
try {
  // This cannot be factorized since webpack simply replace the full process.env.[property] strings
  if (process.env.AP_GAMES_MEMORY_PUBLIC) {
    CONFIG.AP_GAMES_MEMORY_PUBLIC = process.env.AP_GAMES_MEMORY_PUBLIC
  }
} catch (error) {
  LOGGER.warn('Failed to load from process.env')
}

console.log('CONFIG')

Object.keys(CONFIG).forEach((confKey: string) => {
  console.log(` - ${confKey}: '${CONFIG[confKey]}'`)
})

export default CONFIG
