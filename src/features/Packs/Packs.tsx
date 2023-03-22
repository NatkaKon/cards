import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'

import FilterAltOffSharpIcon from '@mui/icons-material/FilterAltOffSharp'
import { Container } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { DebounceSearch } from '../../common/components/DebounceSearch/DebounceSearch'
import { AddModal } from '../../common/components/Modals/AddModal'
import { DeleteModal } from '../../common/components/Modals/DeleteModal'
import { EditPack } from '../../common/components/Modals/EditPack'
import { SearchSlider } from '../../common/components/SearchSlider/SearchSlider'
import { SuperButton } from '../../common/components/SuperButton/SuperButton'
import { PATH } from '../../common/constants/path'
import { setIsMyPackAC, setPackIdAC, setPackNameForTitleAC } from '../Cards/cardsReducer'
import * as paginationSelectors from '../PagePagination/page-pagination-selectors'
import { PagePagination } from '../PagePagination/PagePagination'
import {
  resetPaginationAC,
  setCurrentPageAC,
  setPageCountAC,
} from '../PagePagination/pagination-reducer'
import { PanelButton } from '../PanelButton/PanelButton'
import { TableBodyPacks } from '../Table/TableBodyPacks'
import { HeadCellType, TableHeadWithSorting } from '../Table/TableHeadWithSorting'

import * as packsSelectors from './packs-selectors'
import s from './Packs.module.css'
import {
  addNewPackTC,
  getPacksTC,
  resetAllSortingParamsAC,
  searchMyPacksAC,
  searchPacksByNameAC,
  setSortPacksAC,
} from './packsReducer'

const SORT_VALUES: HeadCellType[] = [
  { id: 'name', label: 'Name' },
  { id: 'cardsCount', label: 'Cards' },
  { id: 'updated', label: 'Last Updated' },
  { id: 'user_name', label: 'Created by' },
  { id: 'actions', label: 'Actions' },
]

export const Packs = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const packName = useAppSelector(packsSelectors.packName)
  const isMyPack = useAppSelector(packsSelectors.isMyPack)
  const min = useAppSelector(packsSelectors.min)
  const max = useAppSelector(packsSelectors.max)
  const sortPacks = useAppSelector(packsSelectors.sortPacks)

  const page = useAppSelector(paginationSelectors.page)
  const pageCount = useAppSelector(paginationSelectors.pageCount)
  const cardPacksTotalCount = useAppSelector(paginationSelectors.totalPages)

  const [openModal, setOpenModal] = useState(false)
  const [editPackName, setEditPackName] = useState('')
  const [packId, setPackId] = useState('')

  useEffect(() => {
    dispatch(getPacksTC())
  }, [packName, isMyPack, min, max, page, pageCount, cardPacksTotalCount, sortPacks])

  const handleClickOnOpenEditPack = useCallback(
    (packId: string, packName: string) => {
      setOpenModal(true)
      setEditPackName(packName)
      setPackId(packId)
    },
    [editPackName, packId]
  )

  const handleClickMyButton = useCallback(() => {
    dispatch(searchMyPacksAC(true))
  }, [])

  const handleClickAllButton = useCallback(() => {
    dispatch(searchMyPacksAC(false))
  }, [])

  const handleResetAllSortingParams = useCallback(() => {
    dispatch(resetAllSortingParamsAC())
    dispatch(resetPaginationAC())
  }, [])

  const handleChangePage = useCallback((newPage: number) => {
    dispatch(setCurrentPageAC(newPage))
  }, [])

  const handleChangeRowsPerPage = useCallback((pageCount: number) => {
    dispatch(setPageCountAC(pageCount))
  }, [])

  const handleSearchPacksByName = useCallback((packName: string) => {
    dispatch(searchPacksByNameAC(packName))
  }, [])

  const handleClickOnPackName = useCallback(
    (packId: string, isMyPack: boolean, packNameForTitle: string) => {
      dispatch(setPackIdAC(packId))
      dispatch(setIsMyPackAC(isMyPack))
      dispatch(setPackNameForTitleAC(packNameForTitle))

      navigate(PATH.CARDS)
    },
    [navigate]
  )
  const addNewPackHandler = () => {
    dispatch(addNewPackTC())
  }

  const handleRequestSort = useCallback((event: React.MouseEvent<unknown>, newSort: string) => {
    dispatch(setSortPacksAC(newSort))
    dispatch(setCurrentPageAC(1))
  }, [])

  return (
    <Container sx={{ padding: '50px' }}>
      <PanelButton name={'Packs list'} button={'Add new pack'} callBack={addNewPackHandler} />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <DebounceSearch searchQuery={packName} searchDebouncedValue={handleSearchPacksByName} />
        <SuperButton xType={isMyPack ? '' : 'secondary'} onClick={handleClickMyButton}>
          My
        </SuperButton>
        <SuperButton xType={!isMyPack ? '' : 'secondary'} onClick={handleClickAllButton}>
          All
        </SuperButton>
        <SearchSlider min={min} max={max} dispatch={dispatch} />
        <IconButton color="info" onClick={handleResetAllSortingParams}>
          <FilterAltOffSharpIcon fontSize="medium" />
        </IconButton>
      </Box>
      <EditPack
        open={openModal}
        setOpen={setOpenModal}
        packId={packId}
        packName={editPackName}
        setPackName={setEditPackName}
      />
      <AddModal />
      <DeleteModal />
      <PagePagination
        page={page}
        pageCount={pageCount}
        cardPacksTotalCount={cardPacksTotalCount}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <TableContainer component={Paper} elevation={4} className={s.tableContainer}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHeadWithSorting
            orderBy={sortPacks}
            headCells={SORT_VALUES}
            onRequestSort={handleRequestSort}
          />
          <TableBodyPacks
            handleClickOnPackName={handleClickOnPackName}
            handleClickOnOpenEditPack={handleClickOnOpenEditPack}
          />
        </Table>
      </TableContainer>
    </Container>
  )
}
