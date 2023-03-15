import * as React from 'react'

import { Container } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import { useNavigate, NavLink } from 'react-router-dom'

import { useAppSelector } from '../../app/store'
import userPhoto from '../../assets/user.jpg'
import { PATH } from '../../common/constants/path'

import s from './Header.module.css'

const buttonStyle = {
  width: '113px',
  height: '36px',
  borderRadius: '30px',
  boxShadow: 6,
}

export const Header = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const name = useAppSelector(state => state.profile.name)

  const navigate = useNavigate()
  const onClickHandler = () => {
    navigate(PATH.REGISTRATION)
  }

  return (
    <header className={s.header}>
      <Container
        sx={{
          width: '70%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <img src="https://it-incubator.io/_next/static/media/logo.8a063c2a.svg" alt="logo" />
        <div>
          {isLoggedIn ? (
            <div className={s.userData}>
              <span className={s.name}>{name}</span>
              <NavLink to={PATH.PROFILE}>
                <Avatar alt="avatar" src={userPhoto} sx={{ width: '50px', height: '50px' }} />
              </NavLink>
            </div>
          ) : (
            <Button size={'small'} variant="contained" onClick={onClickHandler} sx={buttonStyle}>
              Sing up
            </Button>
          )}
        </div>
      </Container>
    </header>
  )
}
