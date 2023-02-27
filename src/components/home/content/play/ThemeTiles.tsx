import React, { useEffect } from 'react'
// Hooks
import { useDispatch, useSelector } from 'react-redux'
import { useWardProviders } from '@uncover/ward-react'
// Store
import GameSlice from 'store/game/game.slice'
import GameSelectors from 'store/game/game.selectors'
// Libs
import CONFIG from 'config'
import { ArrayUtils } from '@uncover/js-utils'
// Components
import { ThemeTile } from './ThemeTile'
// Style
import './ThemeTiles.css'

export interface ThemeTilesProperties {
}

export const ThemeTiles = ({
}: ThemeTilesProperties) => {

  // Hooks //

  const dispatch = useDispatch()

  const themes = useWardProviders('memory/theme')
  const theme = useSelector(GameSelectors.theme)
  const themeSelected = useSelector(GameSelectors.themeSelected)

  useEffect(() => {
    if (!themeSelected) {
      handleThemeSelected()
    }
  }, [])

  // Events //

  const handleThemeSelected = (themeId?: string) => {
    let theme = themeId
    const themeSelected = themeId
    if (!theme) {
      theme = ArrayUtils.randomElement(themes).name
    }
    dispatch(GameSlice.actions.setTheme({
      theme,
      themeSelected
    }))
  }

  // Rendering //

  if (!themes || !themes.length) {
    return null
  }

  const classes = ['theme-tiles']

  return (
    <div
      className={classes.join(' ')}
    >
      {themes.length > 1 ?
        <ThemeTile
          name='Random'
          title='A Random theme will be selected'
          image={`${CONFIG.AP_GAMES_MEMORY_PUBLIC}/images/thumbnail_random.jpg`}
          className={!themeSelected ? 'selected' : undefined}
          onClick={() => handleThemeSelected()}
        />
        : null}
      {themes.sort((theme1, theme2) => theme1.name.localeCompare(theme2.name)).map((theme) => {
        const {
          name,
          description,
          thumbnail,
        } = theme.attributes
        return (
          <ThemeTile
            key={`theme-${name}`}
            className={themeSelected === theme.name ? 'selected' : ''}
            name={name}
            title={description}
            image={thumbnail}
            onClick={() => handleThemeSelected(theme.name)}
          />
        )
      })}
    </div>
  )
}