import React, { FC } from 'react'

import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import EditIcon from '@mui/icons-material/Edit'
import SchoolIcon from '@mui/icons-material/School'

import { useAppDispatch } from '../../app/store'
import { deletePackTC, editePackTC } from '../Packs/packsReducer'

type PropsType = {
  packId: string
}
export const Actions: FC<PropsType> = ({ packId }) => {
  const dispatch = useAppDispatch()
  const delPackHandler = () => {
    dispatch(deletePackTC(packId))
  }
  const editePackHandler = () => {
    dispatch(editePackTC(packId))
  }

  return (
    <div>
      <SchoolIcon />
      <EditIcon onClick={editePackHandler} />
      <DeleteForeverOutlinedIcon onClick={delPackHandler} />
    </div>
  )
}
