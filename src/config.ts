import Logger from '@uncover/js-utils-logger'
const LOGGER = new Logger('CONFIG')

const CONFIG: {
  AP_GAMES_MEMORY_PLUGIN: string
  AP_GAMES_MEMORY_PUBLIC: string
  AP_GAMES_MEMORY_ENVIRONMENT: string
} = {
  AP_GAMES_MEMORY_PLUGIN: 'http://localhost:8082/plugin.json',
  AP_GAMES_MEMORY_PUBLIC: '',
  AP_GAMES_MEMORY_ENVIRONMENT: 'local',
}

// Load config from env
try {
  // This cannot be factorized since webpack simply replace the full process.env.[property] strings
  if (process.env.AP_GAMES_MEMORY_PLUGIN) {
    CONFIG.AP_GAMES_MEMORY_PLUGIN = process.env.AP_GAMES_MEMORY_PLUGIN
  }
  if (process.env.AP_GAMES_MEMORY_PUBLIC) {
    CONFIG.AP_GAMES_MEMORY_PUBLIC = process.env.AP_GAMES_MEMORY_PUBLIC
  }
  if (process.env.AP_GAMES_MEMORY_ENVIRONMENT) {
    CONFIG.AP_GAMES_MEMORY_ENVIRONMENT = process.env.AP_GAMES_MEMORY_ENVIRONMENT
  }
} catch (error) {
  LOGGER.warn('Failed to load from process.env')
}

console.log('CONFIG')

Object.keys(CONFIG).forEach((confKey: string) => {
  // @ts-ignore
  console.log(` - ${confKey}: '${CONFIG[confKey]}'`)
})

export default CONFIG
