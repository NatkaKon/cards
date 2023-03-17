import * as React from 'react'
import { FC, useEffect } from 'react'

import { Container } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { DebounceSearch } from '../../common/components/DebounceSearch/DebounceSearch'
import { TableBodyCards } from '../Table/TableBodyCards'
import { TableHeadCards } from '../Table/TableHeadCards'

import s from './Cards.module.css'
import { getCardsTC } from './cardsReducer'

export const Cards: FC = () => {
  const dispatch = useAppDispatch()

  const cardQuestion = useAppSelector(state => state.cards.cardQuestion)
  const packId = useAppSelector(state => state.cards.packId)

  useEffect(() => {
    dispatch(getCardsTC())
  }, [cardQuestion, packId])

  return (
    <Container sx={{ padding: '50px' }}>
      <Box sx={{ display: 'flex' }}>
        <DebounceSearch searchQuery={cardQuestion} />
      </Box>
      <TableContainer component={Paper} className={s.tableContainer}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHeadCards />
          <TableBodyCards />
        </Table>
      </TableContainer>
    </Container>
  )
}
