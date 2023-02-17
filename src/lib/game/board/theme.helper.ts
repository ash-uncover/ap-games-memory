import { useWardProvider } from "@uncover/ward-react"
import { useSelector } from "react-redux"
import GameSelectors from "store/game/game.selectors"

export const useTheme = () => {
  const theme = useSelector(GameSelectors.theme)
  return useWardProvider(`${theme}`)
}

export const useThemeCards = () => {
  const theme = useTheme()
  return getThemeCards(theme)
}

export const useThemeMusics = () => {
  const theme = useTheme()
  return theme.attributes.music
}

export const useThemeCardBack = () => {
  const theme = useTheme()
  return theme.attributes.cardBack
}


export const getThemeCards = (theme) => {
  let cards = [
    theme.attributes.card0,
    theme.attributes.card1,
    theme.attributes.card2,
    theme.attributes.card3,
    theme.attributes.card4,
    theme.attributes.card5,
    theme.attributes.card6,
    theme.attributes.card7,
    theme.attributes.card8,
    theme.attributes.card9,
    theme.attributes.card10,
    theme.attributes.card11,
    theme.attributes.card12,
    theme.attributes.card13,
    theme.attributes.card14,
    theme.attributes.card15,
    theme.attributes.card16,
    theme.attributes.card17,
    theme.attributes.card18,
    theme.attributes.card19,
    theme.attributes.card20,
    theme.attributes.card21,
    theme.attributes.card22,
    theme.attributes.card23,
    theme.attributes.card24,
    theme.attributes.card25,
    theme.attributes.card26,
    theme.attributes.card27,
    theme.attributes.card28,
    theme.attributes.card29,
    theme.attributes.card30,
    theme.attributes.card31,
    theme.attributes.card32,
    theme.attributes.card33,
    theme.attributes.card34,
    theme.attributes.card35,
    theme.attributes.card36,
    theme.attributes.card37,
    theme.attributes.card38,
    theme.attributes.card39
  ]
  return cards
}