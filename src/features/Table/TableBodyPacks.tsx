import React from 'react'

import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../app/store'
import { PATH } from '../../common/constants/path'

export const TableBodyPacks = () => {
  const packs = useAppSelector(state => state.packs)
  const navigate = useNavigate()

  const onClickHandler = () => {
    return navigate(PATH.CARDS)
  }

  return (
    <TableBody>
      {packs.cardPacks.map(el => (
        <TableRow key={el._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell component="th" scope="row" onClick={onClickHandler}>
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
