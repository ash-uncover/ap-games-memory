import { ArrayUtils } from '@uncover/js-utils'
import CONFIG from 'config'

export type AudioType = 'music' | 'interface' | 'game'

export const AudioTypes: {
  MUSIC: AudioType
  INTERFACE: AudioType
  GAME: AudioType
} = {
  MUSIC: 'music',
  INTERFACE: 'interface',
  GAME: 'game'
}

export const AudioFiles = {
  home: '/sound/home.mp3',
  game: '/sound/game.mp3',
  menuChange: '/sound/menu_change.mp3',
  step: '/sound/step.mp3',
}

export const normalizeVolumeValue = (value: number) => {
  return Math.min(Math.max(0, value), 100)
}

class AudioManager {

  #audios: { [key: string]: HTMLAudioElement } = {}
  #playing:{ path: string, type: string }[] = []

  #master = true
  #masterVolume = 100
  #music = true
  #musicVolume = 100
  #interface = true
  #interfaceVolume = 100
  #game = true
  #gameVolume = 100

  constructor() {
  }

  get master() { return this.#master }
  set master(on: boolean) {
    this.#master = on
    this.#updateVolumes()
  }
  get masterVolume() { return this.#masterVolume }
  set masterVolume(value: number) {
    this.#masterVolume = normalizeVolumeValue(value)
    this.#updateVolumes()
  }

  get music() { return this.#music }
  set music(on: boolean) {
    this.#music = on
    this.#updateVolumes()
  }
  get musicVolume() { return this.#musicVolume }
  set musicVolume(value: number) {
    this.#musicVolume = normalizeVolumeValue(value)
    this.#updateVolumes()
  }

  get interface() { return this.#interface }
  set interface(on: boolean) {
    this.#interface = on
    this.#updateVolumes()
  }
  get interfaceVolume() { return this.#interfaceVolume }
  set interfaceVolume(value: number) {
    this.#interfaceVolume = normalizeVolumeValue(value)
    this.#updateVolumes()
  }

  get game() { return this.#game }
  set game(on: boolean) {
    this.#game = on
    this.#updateVolumes()
  }
  get gameVolume() { return this.#gameVolume }
  set gameVolume(value: number) {
    this.#gameVolume = normalizeVolumeValue(value)
    this.#updateVolumes()
  }

  #updateVolumes() {
    this.#playing.forEach((audio) => {
      switch (audio.type) {
        case AudioTypes.GAME: {
          if (this.#game) {
            this.#audios[audio.path].volume = this.#gameVolume / 100
          } else {
            this.#audios[audio.path].volume = 0
          }
          break
        }
        case AudioTypes.MUSIC: {
          if (this.#music) {
            this.#audios[audio.path].volume = this.#musicVolume / 100
          } else {
            this.#audios[audio.path].volume = 0
          }
          break
        }
        case AudioTypes.INTERFACE: {
          if (this.#interface) {
            this.#audios[audio.path].volume = this.#interfaceVolume / 100
          } else {
            this.#audios[audio.path].volume = 0
          }
          break
        }
      }
    })
  }

  play(path: string, type: AudioType = AudioTypes.GAME) {
    this.stop(path)
    switch (type) {
      case AudioTypes.GAME: {
        if (this.#game) {
          this.#audios[path].volume = this.#gameVolume / 100
        } else {
          this.#audios[path].volume = 0
        }
        break
      }
      case AudioTypes.MUSIC: {
        if (this.#music) {
          this.#audios[path].volume = this.#musicVolume / 100
        } else {
          this.#audios[path].volume = 0
        }
        break
      }
      case AudioTypes.INTERFACE: {
        if (this.#interface) {
          this.#audios[path].volume = this.#interfaceVolume / 100
        } else {
          this.#audios[path].volume = 0
        }
        break
      }
    }
    try {
      this.#audios[path].play()
      this.#playing.push({
        path,
        type
      })
    } catch (error) {
      return false
    }
    return true
  }

  stop(path: string) {
    if (!this.#audios[path]) {
      this.#audios[path] = new Audio(`${CONFIG.AP_GAMES_MEMORY_PUBLIC}${path}`)
      this.#audios[path].addEventListener('ended', () => this.stop(path))
    }
    const playing = this.#playing.find(play => play.path === path)
    this.#playing = ArrayUtils.removeElement(this.#playing, playing)
    this.#audios[path].pause()
    this.#audios[path].currentTime = 0
  }
}

const Manager = new AudioManager()
export default Manager