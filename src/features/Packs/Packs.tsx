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
import { PanelButton } from '../PanelButton/PanelButton'
import { TableBodyPacks } from '../Table/TableBodyPacks'
import { TableHead } from '../Table/TableHead'
import { CommonTablePagination } from '../Table/TablePagination'

import s from './Packs.module.css'
import { getPacksTC, resetAllSortingParamsAC, searchMyPacksAC } from './packsReducer'

export const Packs = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const packName = useAppSelector(state => state.packs.packName)
  const isMyPack = useAppSelector(state => state.packs.isMyPack)
  const min = useAppSelector(state => state.packs.min)
  const max = useAppSelector(state => state.packs.max)
  const page = useAppSelector(state => state.packs.page)
  const pageCount = useAppSelector(state => state.packs.pageCount)
  const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)

  useEffect(() => {
    dispatch(getPacksTC())
  }, [packName, isMyPack, min, max, page, pageCount])

  const handleClickMyButton = useCallback(() => {
    dispatch(searchMyPacksAC(true))
  }, [])

  const handleClickAllButton = useCallback(() => {
    dispatch(searchMyPacksAC(false))
  }, [])

  const handleResetAllSortingParams = useCallback(() => {
    dispatch(resetAllSortingParamsAC())
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
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <DebounceSearch searchQuery={packName} />
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
      <PanelButton name={'Packs list'} button={'Add new pack'} />
      <TableContainer component={Paper} className={s.tableContainer}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead />
          <TableBodyPacks handleClickOnPackName={handleClickOnPackName} />
          <CommonTablePagination
            page={page}
            cardPacksTotalCount={cardPacksTotalCount}
            pageCount={pageCount}
          />
        </Table>
      </TableContainer>
    </Container>
  )
}
