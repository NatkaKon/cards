import * as React from 'react'
import { MouseEventHandler } from 'react'

import Button from '@mui/material/Button'

import { useAppDispatch } from '../../app/store'

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
  onClick?: MouseEventHandler<HTMLButtonElement>
}
export const PanelButton = (props: PanelButtonType) => {
  const dispatch = useAppDispatch()

  // const addNewPackHandler = () => {
  //   // dispatch(addNewPackTC())
  //   props.onClick()
  // }

  return (
    <div className={s.panelButton}>
      <h3 className={s.listTitle}>{props.name}</h3>
      <Button
        onClick={props.onClick}
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
