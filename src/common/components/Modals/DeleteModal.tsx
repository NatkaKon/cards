import * as React from 'react'

import Button from '@mui/material/Button'

import { useAppDispatch } from '../../../app/store'
import { deletePackTC } from '../../../features/Packs/packsReducer'
import { PanelButton } from '../../../features/PanelButton/PanelButton'
import { buttonStyle } from '../../constants/form-button-style'

import { BasicModal } from './BasicModal'
import s from './Modal.module.css'

type PropsType = {
  packId?: string
}
export const DeleteModal = (props: PropsType) => {
  const [open, setOpen] = React.useState(false)
  const dispatch = useAppDispatch()
  const handleOpen = () => {
    setOpen(true)
  }
  const onClickHandlerClose = () => {
    setOpen(false)
  }
  const delPackHandler = () => {
    // dispatch(deletePackTC(props.packId))
  }

  return (
    <>
      <PanelButton name={'Packs list'} button={'Delete pack'} callBack={handleOpen} />
      <BasicModal open={open} setOpen={setOpen}>
        <div className={s.modalContainer}>
          <div className={s.headerModal}>
            <div>Delete pack</div>
            <Button className={s.closeButton} onClick={onClickHandlerClose}>
              ✖️
            </Button>
          </div>
          <div className={s.textAttention}>
            Do you really want to remove <strong>Pack Name?</strong> {'\n'}All cards will be
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
              onClick={delPackHandler}
            >
              Delete
            </Button>
          </div>
        </div>
      </BasicModal>
    </>
  )
}
