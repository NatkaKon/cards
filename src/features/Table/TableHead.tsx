import * as React from 'react'

import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import s from '../Packs/Packs.module.css'

export const TableHead = () => {
  return (
    <TableRow className={s.tableRow}>
      <TableCell className={s.tableCell}>Name</TableCell>
      <TableCell align="right">Cards</TableCell>
      <TableCell align="right">Last Updated</TableCell>
      <TableCell align="right">Created by</TableCell>
      <TableCell align="right">Actions</TableCell>
    </TableRow>
  )
}
