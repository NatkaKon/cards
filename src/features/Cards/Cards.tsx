import * as React from 'react'
import { useEffect } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'

import { useAppDispatch } from '../../app/store'
import { TableBodyCards } from '../Table/TableBodyCards'
import { TableHeadCards } from '../Table/TableHeadCards'

import s from './Cards.module.css'
import { GetCardsPayloadType } from './cardsAPI'
import { getCardsTC } from './cardsReducer'

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

export const Cards = () => {
  const dispatch = useAppDispatch()
  const PayloadType: GetCardsPayloadType = {
    cardsPack_id: '63e24e52dc68ee2a44114e9a',
  }

  useEffect(() => {
    dispatch(getCardsTC(PayloadType))
  }, [])

  return (
    <TableContainer component={Paper} className={s.tableContainer}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHeadCards />
        <TableBodyCards />
      </Table>
    </TableContainer>
  )
}
