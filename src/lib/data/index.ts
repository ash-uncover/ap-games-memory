import { DataManager } from '@uncover/games-common'

import CONFIG from 'config'

import { Card, CardsData } from './card.helper'

export const Cards: { [key: string]: Card } = {}

const Data = new DataManager(`${CONFIG.AP_GAMES_MEMORY_PUBLIC}/data/`)

export const loadCardsData = async () => {
  const cards = await Data.load<CardsData>('cards.json')
  cards.cards.forEach((card: Card) => {
    Cards[card.id] = card
  })
}

export const loadData = async () => {
  return Promise.all([
    loadCardsData(),
  ])
}
