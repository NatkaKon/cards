import React from 'react'

import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { useAppSelector } from '../../app/store'

export const TableBodyPacks = () => {
  const packs = useAppSelector(state => state.packs)

  return (
    <TableBody>
      {packs.cardPacks.map(el => (
        <TableRow key={el._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell component="th" scope="row">
            {el.name}
          </TableCell>
          <TableCell align="right">{el.cardsCount}</TableCell>
          <TableCell align="right">{el.updated.split('T')[0]}</TableCell>
          <TableCell align="right">{el.user_name}</TableCell>
          <TableCell align="right">icon</TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
