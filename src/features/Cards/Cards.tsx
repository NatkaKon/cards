import * as React from 'react'
import { FC, useCallback, useEffect, useState } from 'react'

import FilterAltOffSharpIcon from '@mui/icons-material/FilterAltOffSharp'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import { useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { DebounceSearch } from '../../common/components/DebounceSearch/DebounceSearch'
import { EmptyMessage } from '../../common/components/EmptyMessage/EmptyMessage'
import { CardModal } from '../../common/components/Modals/CardModal'
import { DeleteModal } from '../../common/components/Modals/DeleteModal'
import { ToPackListLink } from '../../common/components/ToPackListLink/ToPackListLink'
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
import { selectIsMyPack } from './cards-selectors'
import s from './Cards.module.css'
import {
  addNewCardTC,
  deleteCardTC,
  getCardsTC,
  resetCardsSortingParamsAC,
  searchCardsByQuestionAC,
  setIsMyPackAC,
  setPackIdAC,
  setPackNameForTitleAC,
  setSortCardsAC,
  updateCardTC,
} from './cardsReducer'

const CARDS_SORT_VALUES: HeadCellType[] = [
  { id: 'question', label: 'Question' },
  { id: 'answer', label: 'Answer' },
  { id: 'updated', label: 'Last Updated' },
  { id: 'grade', label: 'Grade' },
  { id: 'actions', label: 'Actions' },
]

export const Cards: FC = () => {
  const dispatch = useAppDispatch()

  const cards = useAppSelector(cardsSelectors.cards)
  const isMyPack = useAppSelector(selectIsMyPack)

  const cardQuestion = useAppSelector(cardsSelectors.cardQuestion)
  const packId = useAppSelector(cardsSelectors.packId)
  const sortCards = useAppSelector(cardsSelectors.sortCards)

  const page = useAppSelector(paginationSelectors.page)
  const pageCount = useAppSelector(paginationSelectors.pageCount)
  const cardsTotalCount = useAppSelector(paginationSelectors.totalPages)

  const [searchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)

  // states for modals
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [modalCardQuestion, setModalCardQuestion] = useState('')
  const [modalCardAnswer, setModalCardAnswer] = useState('')
  const [cardId, setCardId] = useState('')

  useEffect(() => {
    params.cardsPack_id && dispatch(setPackIdAC(params.cardsPack_id))
    // if pack is mine
    params.accessory === 'true' && dispatch(setIsMyPackAC(true))
    params.title && dispatch(setPackNameForTitleAC(params.title))

    dispatch(getCardsTC())
  }, [cardQuestion, page, pageCount, cardsTotalCount, sortCards])

  const handleOpenEditCard = useCallback(
    (cardId: string, cardQuestion: string, cardAnswer: string) => {
      setOpenEdit(true)
      setModalCardQuestion(cardQuestion)
      setModalCardAnswer(cardAnswer)
      setCardId(cardId)
    },
    [cardId, modalCardAnswer, modalCardQuestion]
  )

  const handleOpenAddNewCard = useCallback(() => {
    setOpenAdd(true)
  }, [openAdd])

  const handleOpenDeletePack = useCallback(
    (cardId: string, cardQuestion: string) => {
      setOpenDelete(true)
      setCardId(cardId)
      setModalCardQuestion(cardQuestion)
    },
    [openDelete, cardId, cardQuestion]
  )

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

    setOpenEdit(false)
    setModalCardQuestion('')
    setModalCardAnswer('')
    setCardId('')
  }, [openEdit, modalCardAnswer, modalCardQuestion, cardId])

  const onSaveAddNewCard = useCallback(() => {
    dispatch(addNewCardTC(packId, modalCardQuestion, modalCardAnswer))

    setOpenAdd(false)
    setModalCardQuestion('')
    setModalCardAnswer('')
  }, [openAdd, modalCardQuestion, modalCardAnswer, cardId])

  const onDeleteCard = useCallback(() => {
    dispatch(deleteCardTC(cardId))

    setOpenDelete(false)
    setModalCardQuestion('')
    setCardId('')
  }, [cardId, modalCardQuestion, openDelete])

  return (
    <Container sx={{ padding: '30px' }}>
      <ToPackListLink />
      <CardNameAndButton onAddNewCardClick={handleOpenAddNewCard} />
      {cards.length !== 0 ? (
        <>
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
          <TableContainer component={Paper} elevation={4} className={s.tableContainer}>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHeadWithSorting
                orderBy={sortCards}
                headCells={CARDS_SORT_VALUES}
                onRequestSort={handleRequestSort}
              />
              <TableBodyCards
                cards={cards}
                handleOpenEditCard={handleOpenEditCard}
                handleOpenDeletePack={handleOpenDeletePack}
              />
            </Table>
          </TableContainer>
        </>
      ) : (
        <EmptyMessage
          message={
            isMyPack
              ? 'This pack is empty. Click add new card to fill this pack'
              : 'This pack is empty.'
          }
        />
      )}

      <CardModal
        childrenTitle={<div>Edit card</div>}
        open={openEdit}
        setOpen={setOpenEdit}
        cardId={cardId}
        cardQuestion={modalCardQuestion}
        cardAnswer={modalCardAnswer}
        setCardQuestion={setModalCardQuestion}
        setCardAnswer={setModalCardAnswer}
        onSave={onSaveUpdateCard}
      />

      <CardModal
        childrenTitle={<div>Add new card</div>}
        open={openAdd}
        setOpen={setOpenAdd}
        cardQuestion={modalCardQuestion}
        cardAnswer={modalCardAnswer}
        setCardQuestion={setModalCardQuestion}
        setCardAnswer={setModalCardAnswer}
        onSave={onSaveAddNewCard}
      />

      <DeleteModal
        open={openDelete}
        setOpen={setOpenDelete}
        name={modalCardQuestion}
        onDelete={onDeleteCard}
      />
    </Container>
  )
}
