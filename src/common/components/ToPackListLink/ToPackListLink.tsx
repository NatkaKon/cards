import React, { FC } from 'react'

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'

import s from './ToPackListLink.module.css'

export const ToPackListLink: FC = () => {
  const navigate = useNavigate()

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
      <div className={s.linkToPacks} onClick={() => navigate(-1)}>
        <KeyboardBackspaceIcon sx={{ paddingRight: '10px' }} />
        <p>To Pack List</p>
      </div>
    </Box>
  )
}
