import * as React from 'react'

import Button from '@mui/material/Button'

import { useAppDispatch } from '../../app/store'
import { addNewPackTC } from '../Packs/packsReducer'

import s from './PanelButton.module.css'

const buttonStyle = {
  width: '175px',
  height: '36px',
  borderRadius: '30px',
  boxShadow: 6,
}

export const PanelButton = () => {
  const dispatch = useAppDispatch()
  const addNewPackHandler = () => {
    dispatch(addNewPackTC())
  }

  return (
    <div className={s.panelButton}>
      <h3 className={s.listTitle}>Packs list</h3>
      <Button
        onClick={addNewPackHandler}
        type="submit"
        color="primary"
        variant="contained"
        size="medium"
        sx={buttonStyle}
      >
        Add new pack
      </Button>
    </div>
  )
}
