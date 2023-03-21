import React, { FC } from 'react'

import SchoolIcon from '@mui/icons-material/School'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { useAppSelector } from '../../app/store'
import * as packsSelectors from '../Packs/packs-selectors'
import * as profileSelectors from '../Profile/profile-selector'

import { Actions } from './Actions'

type TableBodyPacksProps = {
  handleClickOnPackName: (packId: string) => void
}

export const TableBodyPacks: FC<TableBodyPacksProps> = props => {
  const packs = useAppSelector(packsSelectors.packs)
  const userId = useAppSelector(profileSelectors.userId)

  const onClickHandler = (packId: string) => {
    props.handleClickOnPackName(packId)
  }

  return (
    <TableBody>
      {packs.map(el => (
        <TableRow
          key={el._id}
          sx={{
            '&:last-child td, &:last-child th': { border: 0 },
            '&:hover': {
              backgroundColor: '#A0A0A0',
              opacity: [0.9, 0.9, 0.7],
            },
          }}
        >
          <TableCell
            // sx={{
            //   '&:hover': {
            //     backgroundColor: '#A0A0A0',
            //     opacity: [0.9, 0.9, 0.7],
            //   },
            // }}
            component="th"
            scope="row"
            onClick={() => onClickHandler(el._id)}
          >
            {el.name}
          </TableCell>
          <TableCell align="right">{el.cardsCount}</TableCell>
          <TableCell align="right">{el.updated.split('T')[0]}</TableCell>
          <TableCell align="right">{el.user_name}</TableCell>
          <TableCell align="right">
            {el.user_id === userId ? <Actions packId={el._id} /> : <SchoolIcon />}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
