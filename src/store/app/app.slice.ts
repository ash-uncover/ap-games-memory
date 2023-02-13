import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import Language from 'lib/utils/language'

import AppState, { AppLoadStatus, AppLoadStatuses } from 'store/app/app.state'

// STATE //

const initialState: AppState = {
  embedded: false,

  language: Language.FRENCH.id,

  loadStatus: AppLoadStatuses.NONE,
}

// REDUCERS //

interface PayloadEmbedded {
  embedded: boolean
}
const setEmbedded: CaseReducer<AppState, PayloadAction<PayloadEmbedded>> = (state, action) => {
  const {
    embedded
  } = action.payload
  state.embedded = embedded
}

const setLanguage: CaseReducer<AppState, PayloadAction<string>> = (state, action) => {
  state.language = action.payload
}

const setLoadStatus: CaseReducer<AppState, PayloadAction<AppLoadStatus>> = (state, action) => {
  state.loadStatus = action.payload
}

// SLICE //

const AppSlice = createSlice({
  name: 'app',
  initialState,

  reducers: {
    setLanguage,
    setEmbedded,
    setLoadStatus,
  },
})

export default AppSlice
