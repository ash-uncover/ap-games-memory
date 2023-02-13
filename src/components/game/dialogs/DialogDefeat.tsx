import React from 'react'
// Hooks
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
// Store
import GameSlice from 'store/game/game.slice'
import GameSelectors from 'store/game/game.selectors'
// Components
import { Dialog } from './commons/Dialog'
import { DialogAction } from './commons/DialogAction'

import './DialogDefeat.css'

export interface DialogDefeatProperties {
}

export const DialogDefeat = ({
}: DialogDefeatProperties) => {

  // Hooks //

  const dispatch = useDispatch()

  const { t } = useTranslation()

  // Events //

  const handleRetry = () => {
    dispatch(GameSlice.actions.gameEnd())
    dispatch(GameSlice.actions.gameReady())
    dispatch(GameSlice.actions.closeDialog())
  }

  const handleEndGame = () => {
    dispatch(GameSlice.actions.gameEnd())
  }

  const handleClose = () => {
    dispatch(GameSlice.actions.closeDialog())
  }

  // Rendering //

  return (
    <Dialog>

      <h2 className='dialog-title'>
        {t('game.dialogs.defeat.title')}
      </h2>

      <DialogAction
        text={t('game.dialogs.defeat.replay')}
        onClick={handleRetry}
        />

      <DialogAction
        text={t('game.dialogs.defeat.quit')}
        onClick={handleEndGame}
        />

      <DialogAction
        text={t('game.dialogs.defeat.continue')}
        className='selected'
        onClick={handleClose}
      />

    </Dialog>
  )
}