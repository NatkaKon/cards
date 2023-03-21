import * as React from 'react'

import Button from '@mui/material/Button'

import { useAppDispatch } from '../../../app/store'
import { addNewPackTC } from '../../../features/Packs/packsReducer'
import { PanelButton } from '../../../features/PanelButton/PanelButton'
import { buttonStyle } from '../../constants/form-button-style'

import { BasicModal } from './BasicModal'
import { ComboBox } from './ComboBox'
import { FormPropsTextFields } from './FormPropsTextFields'
import s from './Modal.module.css'

export const AddNewCard = () => {
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
      <PanelButton name={'Packs name'} button={'Add new card'} onClick={handleOpen} />
      <BasicModal open={open} setOpen={setOpen}>
        <div className={s.modalContainer}>
          <div className={s.headerModal}>
            <div>Add new pack</div>
            <Button className={s.closeButton} onClick={onClickHandlerClose}>
              ✖️
            </Button>
          </div>
          <ComboBox />
          <FormPropsTextFields label={'Question'} defaultValue={'Hello World'} />
          <FormPropsTextFields label={'Answer'} defaultValue={'Hello World'} />
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
