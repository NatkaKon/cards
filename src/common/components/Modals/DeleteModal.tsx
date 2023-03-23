import * as React from 'react'
import { Dispatch, FC, memo } from 'react'

import Button from '@mui/material/Button'

import { useAppDispatch } from '../../../app/store'
import { deletePackTC } from '../../../features/Packs/packsReducer'
import { buttonStyle } from '../../constants/form-button-style'

import { BasicModal } from './BasicModal'
import s from './Modal.module.css'

type PropsType = {
  open: boolean
  setOpen: Dispatch<React.SetStateAction<boolean>>
  packId: string
  packName: string
  setPackName: Dispatch<React.SetStateAction<string>>
}
export const DeleteModal: FC<PropsType> = memo(props => {
  const dispatch = useAppDispatch()

  const onClickHandlerClose = () => {
    props.setOpen(false)
  }
  const onClickHandlerDelete = () => {
    dispatch(deletePackTC({ id: props.packId }))
    props.setOpen(false)
  }

  return (
    <>
      <BasicModal open={props.open} setOpen={props.setOpen}>
        <div className={s.modalContainer}>
          <div className={s.headerModal}>
            <div>Delete pack</div>
            <Button className={s.closeButton} onClick={onClickHandlerClose}>
              ✖️
            </Button>
          </div>
          <div className={s.textAttention}>
            Do you really want to remove <strong>{props.packName}?</strong> {'\n'}All cards will be
            deleted.
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
    </>
  )
})
