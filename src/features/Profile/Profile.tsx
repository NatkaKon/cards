import * as React from 'react'
import { useCallback } from 'react'

import Avatar from '@mui/material/Avatar'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'

import { useAppDispatch, useAppSelector } from '../../app/store'
import cameraIcon from '../../assets/cameraIcon.svg'
import logOutIcon from '../../assets/logout.svg'
import userPhoto from '../../assets/user.jpg'
import { ToPackListLink } from '../../common/components/ToPackListLink/ToPackListLink'
import { logoutTC } from '../Login/authReducer'

import { EditableSpan } from './EditableSpan'
import { changeUserTC } from './profile-reducer'
import s from './Profile.module.css'

export function Profile(): JSX.Element {
  const name = useAppSelector(state => state.profile.name)
  const email = useAppSelector(state => state.profile.email)
  const dispatch = useAppDispatch()

  const setNewUserName = useCallback(
    (name: string) => {
      dispatch(changeUserTC({ name }))
    },
    [dispatch]
  )

  const logOutHandler = useCallback(() => {
    dispatch(logoutTC())
  }, [dispatch])

  return (
    <Container
      sx={{
        display: 'flex',
        width: '70%',
        flexWrap: 'wrap',
        justifyContent: 'center',
        flexDirection: 'column',
        p: '30px',
      }}
    >
      <ToPackListLink />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Paper
          elevation={3}
          sx={{
            height: '450px',
            width: '400px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h1>Personal Information</h1>
          <div style={{ width: '150px', height: '150px' }}>
            <Avatar
              alt="avatar"
              src={userPhoto}
              sx={{ width: '150px', height: '150px', zIndex: '1', position: 'absolute' }}
            />
            <img
              className={s.avatar}
              src={cameraIcon}
              alt="camera icon"
              onClick={() => {
                alert('Hi')
              }}
            />
          </div>
          <EditableSpan name={name} setNewUserName={setNewUserName} />
          <div className={s.userEmail}>{email}</div>
          <button className={s.logOutBtn} onClick={logOutHandler}>
            <img style={{ width: '25px' }} src={logOutIcon} alt="arrow" />
            <span style={{ paddingLeft: '10px' }}>Log out</span>
          </button>
        </Paper>
      </div>
    </Container>
  )
}
