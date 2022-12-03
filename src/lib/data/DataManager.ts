import CONFIG from 'config'
import {
  Cards,
} from './Data'
import { Card } from './card.helper'

const load = async (url: string) => {
  const headers = new Headers()

  const request = {
    method: 'GET',
    headers
  }

  const response = await fetch(
    url,
    request
  )

  return await response.json()
}

export const loadCardsData = async () => {
  const cards = await load(`${CONFIG.AP_GAMES_MEMORY_PUBLIC}/data/cards.json`)
  cards.cards.forEach((card: Card) => {
    Cards[card.id] = card
  })
}

export const loadData = async () => {
  return Promise.all([
    loadCardsData(),
  ])
}