import { RootState } from 'store/state'

export const base = (state: RootState) => state.app

export const embedded = (state: RootState) => base(state).embedded
export const language = (state: RootState) => base(state).language
export const loadStatus = (state: RootState) => base(state).loadStatus

const AppSelectors = {
  embedded,
  language,
  loadStatus,
}

export default AppSelectors
