import * as React from 'react'
import { useState } from 'react'

import TextField from '@mui/material/TextField'

import editeIcon from '../../assets/Edit.svg'

import s from './Profile.module.css'

type EditableSpanPropsType = {
  name: string
}

export const EditableSpan = ({ name }: EditableSpanPropsType) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleIsEditing = () => {
    setIsEditing(true)
  }

  return (
    <div>
      {isEditing ? (
        <div className={s.editeMode}>
          <TextField
            id="standard-helperText"
            label="Nickname"
            defaultValue={name}
            variant="standard"
            className={s.input}
          />
          <button className={s.saveBtn}>SAVE</button>
        </div>
      ) : (
        <div onDoubleClick={handleIsEditing} className={s.userName}>
          {name}
          <img onClick={handleIsEditing} className={s.editeIcon} src={editeIcon} alt="pencil" />
        </div>
      )}
    </div>
  )
}
