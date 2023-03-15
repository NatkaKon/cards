import * as React from 'react'
import { useCallback, useEffect } from 'react'

import Box from '@mui/material/Box'
import { Container } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { DebounceSearch } from '../../common/components/DebounceSearch/DebounceSearch'
import { SuperButton } from '../../common/components/SuperButton/SuperButton'
import { PanelButton } from '../PanelButton/PanelButton'
import { TableBodyPacks } from '../Table/TableBodyPacks'
import { TableHead } from '../Table/TableHead'

import s from './Packs.module.css'
import { getPacksTC, searchMyPacksAC } from './packsReducer'

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

  const searchName = useAppSelector(state => state.packs.searchName)
  const isMyPack = useAppSelector(state => state.packs.isMyPack)

  useEffect(() => {
    dispatch(getPacksTC())
  }, [searchName, isMyPack])

  const handleClickMyButton = useCallback(() => {
    dispatch(searchMyPacksAC(true))
  }, [])

  const handleClickAllButton = useCallback(() => {
    dispatch(searchMyPacksAC(false))
  }, [])

  return (
    <Container sx={{ padding: '50px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <DebounceSearch searchQuery={searchName} />
        <SuperButton xType={isMyPack ? '' : 'secondary'} onClick={handleClickMyButton}>
          My
        </SuperButton>
        <SuperButton xType={!isMyPack ? '' : 'secondary'} onClick={handleClickAllButton}>
          All
        </SuperButton>
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
