import React from 'react'

import '../App.css'

import { Header } from '../features/Header/Header'
import { PanelButton } from '../features/PanelButton/PanelButton'
import { Pages } from '../routes/Pages'

function App() {
  return (
    <div className="App">
      <Header />
      <PanelButton />
      <Pages />
    </div>
  )
}

export default App
