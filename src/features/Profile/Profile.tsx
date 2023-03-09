import * as React from 'react'
import { useCallback } from 'react'

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { Container } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

import cameraIcon from '../../assets/cameraIcon.svg'
import logOutIcon from '../../assets/logout.svg'
import userPhoto from '../../assets/user.jpg'
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks'

import { EditableSpan } from './EditableSpan'
import { setNewUserNameAC } from './profile-reducer'
import s from './Profile.module.css'

export function Profile(): JSX.Element {
  const name = useAppSelector(state => state.profileReducer.name)
  const email = useAppSelector(state => state.profileReducer.email)
  const dispatch = useAppDispatch()

  const setNewUserName = useCallback(
    (name: string) => {
      dispatch(setNewUserNameAC(name))
    },
    [dispatch]
  )

  return (
    <Container sx={{ display: 'flex', width: '70%', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Box sx={{ width: '100%', height: '100px', display: 'flex', alignItems: 'center' }}>
        <KeyboardBackspaceIcon sx={{ paddingRight: '10px' }} />
        <p>Back to Pack List</p>
      </Box>

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
        <button className={s.logOutBtn}>
          <img style={{ width: '25px' }} src={logOutIcon} alt="arrow" />
          <span style={{ paddingLeft: '10px' }}>Log out</span>
        </button>
      </Paper>
    </Container>
  )
}
