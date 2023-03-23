import React, { FC } from 'react'

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import Box from '@mui/material/Box'
import { NavLink } from 'react-router-dom'

import { PATH } from '../../constants/path'

import s from './ToPackListLink.module.css'

export const ToPackListLink: FC = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <NavLink
        to={PATH.PACKS}
        className={({ isActive }) => (isActive ? s.activeLink : s.inactiveLink)}
      >
        <div className={s.linkToPacks}>
          <KeyboardBackspaceIcon sx={{ paddingRight: '10px' }} />
          <p>To Pack List</p>
        </div>
      </NavLink>
    </Box>
  )
}
