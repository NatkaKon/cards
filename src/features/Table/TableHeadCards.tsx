import * as React from 'react'

import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import s from '../Packs/Packs.module.css'

export const TableHeadCards = () => {
  return (
    <TableRow className={s.tableRow}>
      <TableCell className={s.tableCell}>Question</TableCell>
      <TableCell align="right">Answer</TableCell>
      <TableCell align="right">Last Updated</TableCell>
      <TableCell align="right">Grade</TableCell>
    </TableRow>
  )
}
