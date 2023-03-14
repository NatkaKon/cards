import React, { useEffect } from 'react'

import '../App.css'

import { Grid } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

import { Header } from '../features/Header/Header'
import { PanelButton } from '../features/PanelButton/PanelButton'
import { Pages } from '../routes/Pages'

import { initializeAppTC } from './app-reducer'
import { useAppDispatch, useAppSelector } from './store'

function App() {
  const isInitialized = useAppSelector(state => state.appReducer.isInitialized)
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
      <PanelButton />
      <Pages />
    </div>
  )
}

export default App
