import * as React from 'react'
import { useEffect } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { useAppDispatch, useAppSelector } from '../../app/store'

import { getPacksTC } from './packsReducer'

// function createData(name: string, cardsCount: number, updated: string, created: string) {
//   return { name, cardsCount, updated, created }
// }
//
// const rows = [
//   createData('name', 159, '', 'kk'),
//   createData('Ice cream sandwich', 237, '', 'hhh'),
//   createData('Ice cream sandwich', 237, '', 'kkk'),
//   createData('Ice cream sandwich', 237, '', 'gg'),
// ]

export const Packs = () => {
  const dispatch = useAppDispatch()
  const PayloadType = {
    packName: 'aaa',
    min: 0,
    max: 10,
    sortPacks: 'a',
    page: 5,
    pageCount: 5,
  }
  const packs = useAppSelector(state => state.packs)

  useEffect(() => {
    dispatch(getPacksTC(PayloadType))
  }, [])

  return (
    <TableContainer component={Paper}>
      <h3>Packs list</h3>

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Cards</TableCell>
            <TableCell align="right">Last Updated</TableCell>
            <TableCell align="right">Created by</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
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
              {/*<TableCell component="th" scope="row">*/}
              {/*  {row.name}*/}
              {/*</TableCell>*/}
              {/*<TableCell align="right">{row.name}</TableCell>*/}
              {/*<TableCell align="right">{row.cardsCount}</TableCell>*/}
              {/*<TableCell align="right">{row.updated}</TableCell>*/}
              {/*<TableCell align="right">{row.created}</TableCell>*/}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
