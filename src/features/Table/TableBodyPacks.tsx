import React, { FC } from 'react'

import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import EditIcon from '@mui/icons-material/Edit'
import SchoolIcon from '@mui/icons-material/School'
import IconButton from '@mui/material/IconButton'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { useAppDispatch, useAppSelector } from '../../app/store'
import * as packsSelectors from '../Packs/packs-selectors'
import { deletePackTC, updatePackTC } from '../Packs/packsReducer'
import * as profileSelectors from '../Profile/profile-selector'

type TableBodyPacksProps = {
  handleClickOnPackName: (packId: string, isMyPack: boolean, packNameForTitle: string) => void
  handleClickOnOpenEditPack: (packId: string, packName: string) => void
  handleOpenDeletePack: (packId: string, name: string) => void
}

export const TableBodyPacks: FC<TableBodyPacksProps> = props => {
  const [isOpen, setIsOpen] = React.useState(false)
  const packs = useAppSelector(packsSelectors.packs)
  const userId = useAppSelector(profileSelectors.userId)

  const onClickHandler = (packId: string, packUserId: string, packNameForTitle: string) => {
    props.handleClickOnPackName(packId, userId === packUserId, packNameForTitle)
  }
  const dispatch = useAppDispatch()
  // const delPackHandler = (packId: string) => dispatch(deletePackTC(packId))

  const handleClickOnOpenEditPack = (packId: string, packName: string) => {
    props.handleClickOnOpenEditPack(packId, packName)
  }

  const showModalDelete = (packId: string, name: string) => {
    props.handleOpenDeletePack(packId, name)
    // dispatch(deletePackTC({ _id: packId }))
  }
  const editePackHandler = (packId: string) => dispatch(updatePackTC({ _id: packId }))

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
            component="th"
            scope="row"
            onClick={() => onClickHandler(el._id, el.user_id, el.name)}
          >
            {el.name}
          </TableCell>
          <TableCell align="right">{el.cardsCount}</TableCell>
          <TableCell align="right">{el.updated.split('T')[0]}</TableCell>
          <TableCell align="right">{el.user_name}</TableCell>
          <TableCell align="right">
            {el.user_id === userId ? (
              <>
                <IconButton onClick={() => handleClickOnOpenEditPack(el._id, el.name)}></IconButton>
                <SchoolIcon />
                <EditIcon onClick={() => editePackHandler(el._id)} />
                <DeleteForeverOutlinedIcon onClick={() => showModalDelete(el._id, el.name)} />
              </>
            ) : (
              <IconButton onClick={() => {}}>
                <SchoolIcon />
              </IconButton>
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
