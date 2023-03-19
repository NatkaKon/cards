import * as React from 'react'
import { ReactNode } from 'react'

import Button from '@mui/material/Button'

import { useAppDispatch } from '../../../app/store'
import { addNewPackTC } from '../../../features/Packs/packsReducer'
import { PanelButton } from '../../../features/PanelButton/PanelButton'
import { buttonStyle } from '../../constants/form-button-style'

import { BasicModal } from './BasicModal'
import s from './Modal.module.css'

export const AddModal = () => {
  const [open, setOpen] = React.useState(false)
  const dispatch = useAppDispatch()

  const onClickHandlerClose = () => {
    setOpen(false)
  }
  const onClickHandlerSave = () => {
    dispatch(addNewPackTC())
  }
  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <>
      <PanelButton name={'Packs list'} button={'Add new pack'} onClick={handleOpen} />
      <BasicModal open={open} setOpen={setOpen}>
        <div className={s.modalContainer}>
          <div className={s.headerModal}>
            <div>Add new pack</div>
            <Button className={s.closeButton} onClick={onClickHandlerClose}>
              ✖️
            </Button>
          </div>
          <div>Name pack</div>
          <div>Checkbox</div>
          <div className={s.bottomModal}>
            <Button
              type="submit"
              color="primary"
              variant="text"
              size="medium"
              sx={buttonStyle}
              className={s.buttonBottom}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              size="medium"
              sx={buttonStyle}
              className={s.buttonBottom}
              onClick={onClickHandlerSave}
            >
              Save
            </Button>
          </div>
        </div>
      </BasicModal>
    </>
  )
}
