import * as React from 'react'
import { FC, useCallback, useEffect } from 'react'

import FilterAltOffSharpIcon from '@mui/icons-material/FilterAltOffSharp'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import { NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { DebounceSearch } from '../../common/components/DebounceSearch/DebounceSearch'
import * as paginationSelectors from '../PagePagination/page-pagination-selectors'
import { AddNewCard } from '../../common/components/Modals/AddNewCard'
import { PATH } from '../../common/constants/path'
import { PagePagination } from '../PagePagination/PagePagination'
import {
  resetPaginationAC,
  setCurrentPageAC,
  setPageCountAC,
} from '../PagePagination/pagination-reducer'
import { TableBodyCards } from '../Table/TableBodyCards'
import { HeadCellType, TableHeadWithSorting } from '../Table/TableHeadWithSorting'

import { CardNameAndButton } from './CardnameAndButton'
import * as cardsSelectors from './cards-selectors'
import s from './Cards.module.css'
import {
  getCardsTC,
  resetCardsSortingParamsAC,
  searchCardsByQuestionAC,
  setSortCardsAC,
} from './cardsReducer'

const CARDS_SORT_VALUES: HeadCellType[] = [
  { id: 'question', label: 'Question' },
  { id: 'answer', label: 'Answer' },
  { id: 'updated', label: 'Last Updated' },
  { id: 'grade', label: 'Grade' },
]

export const Cards: FC = () => {
  const dispatch = useAppDispatch()

  const cardQuestion = useAppSelector(cardsSelectors.cardQuestion)
  const packId = useAppSelector(cardsSelectors.packId)
  const sortCards = useAppSelector(cardsSelectors.sortCards)

  const page = useAppSelector(paginationSelectors.page)
  const pageCount = useAppSelector(paginationSelectors.pageCount)
  const cardsTotalCount = useAppSelector(paginationSelectors.totalPages)

  useEffect(() => {
    dispatch(getCardsTC())
  }, [cardQuestion, packId, page, pageCount, cardsTotalCount, sortCards])

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

  const handleRequestSort = useCallback((event: React.MouseEvent<unknown>, newSort: string) => {
    dispatch(setSortCardsAC(newSort))
    dispatch(setCurrentPageAC(1))
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
      <AddNewCard />
      <TableContainer component={Paper} elevation={4} className={s.tableContainer}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHeadWithSorting
            orderBy={sortCards}
            headCells={CARDS_SORT_VALUES}
            onRequestSort={handleRequestSort}
          />
          <TableBodyCards />
        </Table>
      </TableContainer>
    </Container>
  )
}
