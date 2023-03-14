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

type PanelButtonType = {
  name: string
  button: string
}
export const PanelButton = (props: PanelButtonType) => {
  const dispatch = useAppDispatch()
  const addNewPackHandler = () => {
    dispatch(addNewPackTC())
  }

  return (
    <div className={s.panelButton}>
      <h3 className={s.listTitle}>{props.name}</h3>
      <Button
        onClick={addNewPackHandler}
        type="submit"
        color="primary"
        variant="contained"
        size="medium"
        sx={buttonStyle}
      >
        {props.button}
      </Button>
    </div>
  )
}
