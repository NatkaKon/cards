import * as React from 'react'

import Button from '@mui/material/Button'
import { Navigate } from 'react-router-dom'

import { PATH } from '../../common/constants/path'

import s from './Header.module.css'

const onClickHandler = () => {
  return <Navigate to={PATH.REGISTRATION} />
}

export const Header = () => {
  return (
    <header className={s.header}>
      <img src="https://it-incubator.io/_next/static/media/logo.8a063c2a.svg" alt="logo" />
      <div>
        <Button size={'small'} variant="contained" onClick={onClickHandler}>
          Sing in
        </Button>
      </div>
    </header>
  )
}
