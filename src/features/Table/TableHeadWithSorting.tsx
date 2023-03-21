import React, { FC, memo, useState } from 'react'

import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import visuallyHidden from '@mui/utils/visuallyHidden'

import s from '../Packs/Packs.module.css'

import { defineSortOrder } from './define-sort-utility'

export type SortOrderType = 'asc' | 'desc'

export type HeadCellType = {
  id: string
  label: string
}

type PropsType = {
  onRequestSort: (event: React.MouseEvent<unknown>, newSort: string) => void
  headCells: HeadCellType[]
  orderBy: string
}

export const TableHeadWithSorting: FC<PropsType> = memo(({ headCells, orderBy, onRequestSort }) => {
  const [order, setOrder] = useState<SortOrderType>('desc')

  // delete 0 or 1 from sort name
  orderBy = orderBy.replace(/[0-9]/g, '')

  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    const isAsc = orderBy === property && order === 'asc'

    setOrder(isAsc ? 'desc' : 'asc')

    const definedSort = defineSortOrder(property, order)

    onRequestSort(event, definedSort)
  }

  return (
    <TableHead>
      <TableRow className={s.tableRow}>
        {headCells.map((headCell, index) => (
          <TableCell
            className={s.tableCell}
            sx={{ bgcolor: '#EFEFEF' }}
            key={headCell.id}
            align={index !== 0 ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'desc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
})
