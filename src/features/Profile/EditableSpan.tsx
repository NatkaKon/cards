import * as React from 'react'
import { useState, ChangeEvent } from 'react'

import TextField from '@mui/material/TextField'

import editeIcon from '../../assets/Edit.svg'

import s from './Profile.module.css'

type EditableSpanPropsType = {
  name: string
  setNewUserName: (name: string) => void
}

export const EditableSpan = ({ name, setNewUserName }: EditableSpanPropsType) => {
  const [isEditing, setIsEditing] = useState(false)
  const [userName, setUserName] = useState(name)

  const handleIsEditing = () => {
    setIsEditing(true)
  }
  const onChangeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value)
  }

  return (
    <div>
      {isEditing ? (
        <div className={s.editeMode}>
          <TextField
            onChange={onChangeNameHandler}
            id="standard-helperText"
            label="Nickname"
            defaultValue={userName}
            variant="standard"
            className={s.input}
          />
          <button
            onClick={() => {
              setNewUserName(userName)
              setIsEditing(false)
            }}
            className={s.saveBtn}
          >
            SAVE
          </button>
        </div>
      ) : (
        <div onDoubleClick={handleIsEditing} className={s.userName}>
          {userName}
          <img onClick={handleIsEditing} className={s.editeIcon} src={editeIcon} alt="pencil" />
        </div>
      )}
    </div>
  )
}
