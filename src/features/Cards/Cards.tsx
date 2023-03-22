import * as React from 'react'
import { FC, useCallback, useEffect, useState } from 'react'

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
import { AddNewCard } from '../../common/components/Modals/AddNewCard'
import { PATH } from '../../common/constants/path'
import * as paginationSelectors from '../PagePagination/page-pagination-selectors'
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
  addNewCardTC,
  getCardsTC,
  resetCardsSortingParamsAC,
  searchCardsByQuestionAC,
  setSortCardsAC,
  updateCardTC,
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

  const [openModal, setOpenModal] = useState(false)
  const [modalCardQuestion, setModalCardQuestion] = useState('')
  const [modalCardAnswer, setModalCardAnswer] = useState('')
  const [cardId, setCardId] = useState('')

  useEffect(() => {
    dispatch(getCardsTC())
  }, [cardQuestion, packId, page, pageCount, cardsTotalCount, sortCards])

  const handleOpenEditCard = useCallback(
    (cardId: string, cardQuestion: string, cardAnswer: string) => {
      setOpenModal(true)
      setModalCardQuestion(cardQuestion)
      setModalCardAnswer(cardAnswer)
      setCardId(cardId)
    },
    [cardId, modalCardAnswer, modalCardQuestion]
  )

  const handleOpenAddNewCard = useCallback(() => {
    setOpenModal(true)
    // setModalCardQuestion(cardQuestion)
    // setModalCardAnswer(cardAnswer)
  }, [modalCardAnswer, modalCardQuestion])

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

  const onSaveUpdateCard = useCallback(() => {
    dispatch(updateCardTC({ _id: cardId, question: modalCardQuestion, answer: modalCardAnswer }))
    setOpenModal(false)
    setModalCardQuestion('')
    setModalCardAnswer('')
  }, [cardId, modalCardAnswer, modalCardQuestion])

  const onSaveAddNewCard = useCallback(() => {
    dispatch(addNewCardTC(packId, modalCardQuestion, modalCardAnswer))
    setOpenModal(false)
    setModalCardQuestion('')
    setModalCardAnswer('')
  }, [packId, modalCardQuestion, modalCardAnswer])

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
      <CardNameAndButton onAddNewCardClick={handleOpenAddNewCard} />
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
      <AddNewCard
        modalName="Edit card"
        open={openModal}
        setOpen={setOpenModal}
        cardId={cardId}
        cardQuestion={modalCardQuestion}
        cardAnswer={modalCardAnswer}
        setCardQuestion={setModalCardQuestion}
        setCardAnswer={setModalCardAnswer}
        onSave={onSaveUpdateCard}
      />

      <AddNewCard
        open={openModal}
        setOpen={setOpenModal}
        cardQuestion={modalCardQuestion}
        cardAnswer={modalCardAnswer}
        setCardQuestion={setModalCardQuestion}
        setCardAnswer={setModalCardAnswer}
        onSave={onSaveAddNewCard}
      />

      <TableContainer component={Paper} elevation={4} className={s.tableContainer}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHeadWithSorting
            orderBy={sortCards}
            headCells={CARDS_SORT_VALUES}
            onRequestSort={handleRequestSort}
          />
          <TableBodyCards handleClickOnOpenEditCard={handleOpenEditCard} />
        </Table>
      </TableContainer>
    </Container>
  )
}
