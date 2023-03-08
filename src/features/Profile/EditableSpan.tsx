import * as React from 'react'
import { useState } from 'react'

import TextField from '@mui/material/TextField'

import editeIcon from '../../assets/Edit.svg'

import s from './Profile.module.css'

export const EditableSpan = () => {
  const [isEditing, setIsEditing] = useState(true)

  return (
    <div>
      {isEditing ? (
        <div className={s.editeMode}>
          <TextField
            id="standard-helperText"
            label="Nickname"
            defaultValue="Cat-hacker"
            variant="standard"
            className={s.input}
          />
          <button className={s.saveBtn}>SAVE</button>
        </div>
      ) : (
        <div className={s.userName}>
          Cat-hacker
          <img className={s.editeIcon} src={editeIcon} alt="pencil" />
        </div>
      )}
    </div>
  )
}
