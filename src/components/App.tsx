import React, { useEffect, ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppSelectors from 'store/app/app.selectors'
import * as DataManager from 'lib/data/DataManager'
import AppSlice from 'store/app/app.slice'

interface AppProperties {
  children: ReactElement
}

const App = ({
  children
}: AppProperties) => {

  // Hooks //

  const dispatch = useDispatch()
  const loaded = useSelector(AppSelectors.loaded)

  useEffect(() => {
    DataManager.loadData()
      .then(() => dispatch(AppSlice.actions.setLoaded(true)))
  }, [])

  // Rendering //

  if (loaded) {
    return children
  }

  return (
    <div>
      loading
    </div>
  )
}

export default App