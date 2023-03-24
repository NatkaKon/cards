import * as React from 'react'
import { Dispatch, FC, memo } from 'react'

import Button from '@mui/material/Button'

import { buttonStyle } from '../../constants/form-button-style'

import { BasicModal } from './BasicModal'
import s from './Modal.module.css'

type PropsType = {
  open: boolean
  setOpen: Dispatch<React.SetStateAction<boolean>>
  name: string
  onDelete: () => void
}
export const DeleteModal: FC<PropsType> = memo(props => {
  const onClickHandlerClose = () => props.setOpen(false)

  const onClickHandlerDelete = () => props.onDelete()

  return (
    <BasicModal open={props.open} setOpen={props.setOpen}>
      <div className={s.modalContainer}>
        <div className={s.headerModal}>
          <div>Delete pack</div>
          <Button className={s.closeButton} onClick={onClickHandlerClose}>
            ✖️
          </Button>
        </div>
        <div className={s.textAttention}>
          Do you really want to remove card with question <strong>{props.name}?</strong> {'\n'}All
          cards will be deleted.
        </div>
        <div className={s.bottomModal}>
          <Button
            type="submit"
            color="primary"
            variant="text"
            size="medium"
            sx={buttonStyle}
            className={s.buttonBottom}
            onClick={onClickHandlerClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="error"
            variant="contained"
            size="medium"
            sx={buttonStyle}
            className={s.buttonBottom}
            onClick={onClickHandlerDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </BasicModal>
  )
})
