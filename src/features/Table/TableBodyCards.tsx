import React from 'react'

import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { useAppSelector } from '../../app/store'

export const TableBodyCards = () => {
  const cards = useAppSelector(state => state.cards)

  return (
    <TableBody>
      {cards.cards.map(el => (
        <TableRow key={el._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell component="th" scope="row">
            {el.question}
          </TableCell>
          <TableCell align="right">{el.answer}</TableCell>
          <TableCell align="right">{el.updated.split('T')[0]}</TableCell>
          <TableCell align="right">{el.grade}</TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
