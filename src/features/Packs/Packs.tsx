import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'

import FilterAltOffSharpIcon from '@mui/icons-material/FilterAltOffSharp'
import { Container } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import { createSearchParams, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { DebounceSearch } from '../../common/components/DebounceSearch/DebounceSearch'
import { DeleteModal } from '../../common/components/Modals/DeleteModal'
import { PackModal } from '../../common/components/Modals/PackModal'
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
  deletePackTC,
  getPacksTC,
  resetAllSortingParamsAC,
  searchMyPacksAC,
  searchPacksByNameAC,
  setSortPacksAC,
  updatePackTC,
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

  // state for modals
  const [openEdit, setOpenEdit] = useState(false)
  const [openAdd, setOpenAdd] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [modalPackName, setModalPackName] = useState('')
  const [packId, setPackId] = useState('')

  useEffect(() => {
    dispatch(getPacksTC())
  }, [packName, isMyPack, min, max, page, pageCount, cardPacksTotalCount, sortPacks])

  const handleOpenEditPack = useCallback(
    (packId: string, packName: string) => {
      setOpenEdit(true)
      setModalPackName(packName)
      setPackId(packId)
    },
    [modalPackName, packId]
  )

  const handleOpenDeletePack = (packId: string, name: string) => {
    setOpenDelete(true)
    setPackId(packId)
    setModalPackName(name)
  }

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

      navigate({
        pathname: PATH.CARDS,
        search: createSearchParams({
          cardsPack_id: packId,
          accessory: `${isMyPack}`,
          title: packNameForTitle,
        }).toString(),
      })
    },
    [navigate]
  )
  const handleOpenAddNewPack = useCallback(() => {
    setOpenAdd(true)
  }, [openAdd])

  const onSaveAddNewPack = useCallback(() => {
    dispatch(addNewPackTC({ name: modalPackName }))

    setOpenAdd(false)
    setModalPackName('')
  }, [modalPackName, openAdd])

  const onSaveUpdatePack = useCallback(() => {
    dispatch(updatePackTC({ _id: packId, name: modalPackName }))

    setOpenEdit(false)
    setModalPackName('')
    setPackId('')
  }, [modalPackName, openEdit])

  const onDeletePack = useCallback(() => {
    dispatch(deletePackTC({ id: packId }))

    setOpenDelete(false)
    setPackId('')
    setModalPackName('')
  }, [packId, openDelete, modalPackName])

  const handleRequestSort = useCallback((event: React.MouseEvent<unknown>, newSort: string) => {
    dispatch(setSortPacksAC(newSort))
    dispatch(setCurrentPageAC(1))
  }, [])

  return (
    <Container sx={{ padding: '30px' }}>
      <PanelButton name={'Packs list'} button={'Add new pack'} callBack={handleOpenAddNewPack} />
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
            handleOpenEditPack={handleOpenEditPack}
            handleOpenDeletePack={handleOpenDeletePack}
          />
        </Table>
      </TableContainer>

      <PackModal
        childrenTitle={<div>Edit pack</div>}
        open={openEdit}
        setOpen={setOpenEdit}
        packName={modalPackName}
        setPackName={setModalPackName}
        onSave={onSaveUpdatePack}
      />

      <PackModal
        childrenTitle={<div>Add pack</div>}
        open={openAdd}
        setOpen={setOpenAdd}
        packName={modalPackName}
        setPackName={setModalPackName}
        onSave={onSaveAddNewPack}
      />

      <DeleteModal
        open={openDelete}
        setOpen={setOpenDelete}
        name={modalPackName}
        onDelete={onDeletePack}
      />
    </Container>
  )
}
