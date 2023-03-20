import * as React from 'react'
import { FC, useCallback, useEffect } from 'react'

import FilterAltOffSharpIcon from '@mui/icons-material/FilterAltOffSharp'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import { NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { DebounceSearch } from '../../common/components/DebounceSearch/DebounceSearch'
import { PATH } from '../../common/constants/path'
import { PagePagination } from '../PagePagination/PagePagination'
import {
  resetPaginationAC,
  setCurrentPageAC,
  setPageCountAC,
} from '../PagePagination/pagination-reducer'
import { TableBodyCards } from '../Table/TableBodyCards'
import { TableHeadCards } from '../Table/TableHeadCards'

import { CardNameAndButton } from './CardnameAndButton'
import s from './Cards.module.css'
import { getCardsTC, resetCardsSortingParamsAC, searchCardsByQuestionAC } from './cardsReducer'

export const Cards: FC = () => {
  const dispatch = useAppDispatch()

  const cardQuestion = useAppSelector(state => state.cards.cardQuestion)
  const packId = useAppSelector(state => state.cards.cardsPack_id)

  const page = useAppSelector(state => state.pagination.page)
  const pageCount = useAppSelector(state => state.pagination.pageCount)
  const cardsTotalCount = useAppSelector(state => state.pagination.totalPages)

  useEffect(() => {
    dispatch(getCardsTC())
  }, [cardQuestion, packId, page, pageCount, cardsTotalCount])

  const handleChangePage = useCallback((newPage: number) => {
    dispatch(setCurrentPageAC(newPage))
  }, [])

  const handleChangeRowsPerPage = useCallback((pageCount: number) => {
    dispatch(setPageCountAC(pageCount))
  }, [])

  const handleReset = useCallback(() => {
    dispatch(resetCardsSortingParamsAC())
    dispatch(resetPaginationAC())
  }, [])

  const handleSearchCardsByQuestion = useCallback((cardQuestion: string) => {
    dispatch(searchCardsByQuestionAC(cardQuestion))
  }, [])

  return (
    <Container sx={{ padding: '50px' }}>
      <Box
        sx={{
          width: '100%',
          height: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <NavLink to={PATH.PACKS}>
          <div className={s.linkToPacks}>
            <KeyboardBackspaceIcon sx={{ paddingRight: '10px' }} />
            <p>To Pack List</p>
          </div>
        </NavLink>
      </Box>
      <CardNameAndButton />
      <Box sx={{ display: 'flex' }}>
        <DebounceSearch
          searchQuery={cardQuestion}
          searchDebouncedValue={handleSearchCardsByQuestion}
        />
        <IconButton color="info" onClick={handleReset}>
          <FilterAltOffSharpIcon fontSize="medium" />
        </IconButton>
      </Box>
      <PagePagination
        page={page}
        pageCount={pageCount}
        cardPacksTotalCount={cardsTotalCount}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <TableContainer component={Paper} className={s.tableContainer}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHeadCards />
          <TableBodyCards />
        </Table>
      </TableContainer>
    </Container>
  )
}
