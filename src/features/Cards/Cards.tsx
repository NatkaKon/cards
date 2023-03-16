import * as React from 'react'
import { useEffect } from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'

import { useAppDispatch } from '../../app/store'
import { DebounceSearch } from '../../common/components/DebounceSearch/DebounceSearch'
import { TableBodyCards } from '../Table/TableBodyCards'
import { TableHeadCards } from '../Table/TableHeadCards'

import s from './Cards.module.css'
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
  const PayloadType = {
    cardsPack_id: '63e24e52dc68ee2a44114e9a',
    cardQuestion: '',
  }

  useEffect(() => {
    dispatch(getCardsTC())
  }, [])

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <DebounceSearch searchQuery={PayloadType.cardQuestion} />
      </Box>
      <TableContainer component={Paper} className={s.tableContainer}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHeadCards />
          <TableBodyCards />
        </Table>
      </TableContainer>
    </>
  )
}
