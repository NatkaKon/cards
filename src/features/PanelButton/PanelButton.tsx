import * as React from 'react'

import Button from '@mui/material/Button'

import s from './PanelButton.module.css'

const buttonStyle = {
  width: '175px',
  height: '36px',
  borderRadius: '30px',
  boxShadow: 6,
}

export const PanelButton = () => {
  return (
    <div className={s.panelButton}>
      <h3 className={s.listTitle}>Packs list</h3>
      <Button type="submit" color="primary" variant="contained" size="medium" sx={buttonStyle}>
        Add new pack
      </Button>
    </div>
  )
}
