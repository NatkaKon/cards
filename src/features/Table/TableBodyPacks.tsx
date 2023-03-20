import React, { FC } from 'react'

import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import EditIcon from '@mui/icons-material/Edit'
import SchoolIcon from '@mui/icons-material/School'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { DeleteModal } from '../../common/components/Modals/DeleteModal'
import { deletePackTC, editePackTC } from '../Packs/packsReducer'

type TableBodyPacksProps = {
  handleClickOnPackName: (packId: string) => void
}

export const TableBodyPacks: FC<TableBodyPacksProps> = props => {
  const packs = useAppSelector(state => state.packs)
  const userId = useAppSelector(state => state.profile._id)

  const onClickHandler = (packId: string) => {
    props.handleClickOnPackName(packId)
  }

  return (
    <TableBody>
      {packs.cardPacks.map(el => (
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
          <TableCell component="th" scope="row" onClick={() => onClickHandler(el._id)}>
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

type ActionsPropsType = {
  packId: string
}
const Actions = (props: ActionsPropsType) => {
  const dispatch = useAppDispatch()

  const delPackHandler = () => {
    dispatch(deletePackTC(props.packId))
  }
  const editePackHandler = () => {
    dispatch(editePackTC(props.packId))
  }

  return (
    <div>
      <SchoolIcon />
      <EditIcon onClick={editePackHandler} />
      <DeleteForeverOutlinedIcon onClick={delPackHandler} />
    </div>
  )
}
