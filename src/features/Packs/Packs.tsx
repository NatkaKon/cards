import * as React from 'react'
import { useCallback, useEffect } from 'react'

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
import { SearchSlider } from '../../common/components/SearchSlider/SearchSlider'
import { SuperButton } from '../../common/components/SuperButton/SuperButton'
import { PATH } from '../../common/constants/path'
import { setPackIdAC } from '../Cards/cardsReducer'
import { PagePagination } from '../PagePagination/PagePagination'
import {
  resetPaginationAC,
  setCurrentPageAC,
  setPageCountAC,
} from '../PagePagination/pagination-reducer'
import { PanelButton } from '../PanelButton/PanelButton'
import { TableBodyPacks } from '../Table/TableBodyPacks'
import { TableHead } from '../Table/TableHead'

import s from './Packs.module.css'
import {
  getPacksTC,
  resetAllSortingParamsAC,
  searchMyPacksAC,
  searchPacksByNameAC,
} from './packsReducer'

export const Packs = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const packName = useAppSelector(state => state.packs.packName)
  const isMyPack = useAppSelector(state => state.packs.isMyPack)
  const min = useAppSelector(state => state.packs.min)
  const max = useAppSelector(state => state.packs.max)
  const page = useAppSelector(state => state.pagination.page)
  const pageCount = useAppSelector(state => state.pagination.pageCount)
  const cardPacksTotalCount = useAppSelector(state => state.pagination.totalPages)

  useEffect(() => {
    dispatch(getPacksTC())
  }, [packName, isMyPack, min, max, page, pageCount, cardPacksTotalCount])

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
    (packId: string) => {
      dispatch(setPackIdAC(packId))

      navigate(PATH.CARDS)
    },
    [navigate]
  )

  return (
    <Container sx={{ padding: '50px' }}>
      <PanelButton name={'Packs list'} button={'Add new pack'} />
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
          <TableHead />
          <TableBodyPacks handleClickOnPackName={handleClickOnPackName} />
        </Table>
      </TableContainer>
    </Container>
  )
}
