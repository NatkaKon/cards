import * as React from 'react'

import Button from '@mui/material/Button'

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
  callBack: () => void
}
export const PanelButton = (props: PanelButtonType) => {
  return (
    <div className={s.panelButton}>
      <h3 className={s.listTitle}>{props.name}</h3>
      <Button
        onClick={props.callBack}
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
