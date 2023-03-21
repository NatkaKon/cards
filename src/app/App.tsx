import React, { useEffect } from 'react'

import '../App.css'

import { Grid } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

import { ErrorSnackbar } from '../common/components/ErrorSnackbar/ErrorSnackbar'
import { Header } from '../features/Header/Header'
import { Pages } from '../routes/Pages'

import { initializeAppTC } from './app-reducer'
import * as appSelectors from './app-selectors'
import { useAppDispatch, useAppSelector } from './store'

function App() {
  const isInitialized = useAppSelector(appSelectors.isInitialized)
  const error = useAppSelector(appSelectors.error)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  if (!isInitialized) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <CircularProgress thickness={5} size="15rem" />
      </Grid>
    )
  }

  return (
    <div className="App">
      <Header />
      <Pages />
      <ErrorSnackbar errMessage={error} />
    </div>
  )
}

export default App
