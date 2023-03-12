import * as React from 'react'
import { useEffect } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'

import { useAppDispatch } from '../../app/store'
import { TableBodyPacks } from '../Table/TableBodyPacks'
import { TableHead } from '../Table/TableHead'

import s from './Packs.module.css'
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
    packName: 'we',
    min: 0,
    max: 10,
    sortPacks: '',
    page: 5,
    pageCount: 5,
  }

  useEffect(() => {
    dispatch(getPacksTC(PayloadType))
  }, [])

  return (
    <TableContainer component={Paper} className={s.tableContainer}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead />
        <TableBodyPacks />
      </Table>
    </TableContainer>
  )
}
