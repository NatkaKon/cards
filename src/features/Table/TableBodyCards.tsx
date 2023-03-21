import React, { FC } from 'react'

import SchoolIcon from '@mui/icons-material/School'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { useAppSelector } from '../../app/store'
import * as cardsSelectors from '../Cards/cards-selectors'
import * as profileSelectors from '../Profile/profile-selector'

import { Actions } from './Actions'

export const TableBodyCards: FC = () => {
  const cards = useAppSelector(cardsSelectors.cards)
  const userId = useAppSelector(profileSelectors.userId)

  return (
    <TableBody>
      {cards.map(el => (
        <TableRow
          key={el._id}
          sx={{
            '&:last-child td, &:last-child th': { border: 0 },
            '&:hover': {
              backgroundColor: '#A0A0A0',
              opacity: [0.9, 0.9, 0.7],
            },
          }}
        >
          <TableCell component="th" scope="row">
            {el.question}
          </TableCell>
          <TableCell align="right">{el.answer}</TableCell>
          <TableCell align="right">{el.updated.split('T')[0]}</TableCell>
          <TableCell align="right">{el.grade}</TableCell>
          <TableCell align="right">
            {el.user_id === userId ? <Actions packId={el._id} /> : <SchoolIcon />}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
