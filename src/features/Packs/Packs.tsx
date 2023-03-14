import * as React from 'react'
import { useEffect } from 'react'

import { Container } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'

import { useAppDispatch } from '../../app/store'
import { DebounceSearch } from '../../common/components/DebounceSearch/DebounceSearch'
import { PanelButton } from '../PanelButton/PanelButton'
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
    packName: '',
    min: 0,
    max: 10,
    sortPacks: '',
    page: 1,
    pageCount: 5,
  }

  useEffect(() => {
    dispatch(getPacksTC(PayloadType))
  }, [])

  return (
    <Container sx={{ padding: '50px' }}>
      <Box sx={{ display: 'flex' }}>
        <DebounceSearch searchQuery={PayloadType.packName} />
      </Box>
      <PanelButton name={'Packs list'} button={'Add new pack'} />
      <TableContainer component={Paper} className={s.tableContainer}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead />
          <TableBodyPacks />
        </Table>
      </TableContainer>
    </Container>
  )
}
