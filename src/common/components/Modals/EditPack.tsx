import * as React from 'react'
import { useState } from 'react'

import Button from '@mui/material/Button'

import { addNewPackTC } from '../../../features/Packs/packsReducer'
import { PanelButton } from '../../../features/PanelButton/PanelButton'
import { buttonStyle } from '../../constants/form-button-style'

import { BasicModal } from './BasicModal'
import { CheckboxLabels } from './CheckboxLabels'
import { FormPropsTextFields } from './FormPropsTextFields'
import s from './Modal.module.css'

export const EditPack = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const onClickHandlerClose = () => {
    setOpen(false)
  }
  const onClickHandlerSave = () => {
    // dispatch(addNewPackTC())
  }

  return (
    <>
      <PanelButton name={'Packs list'} button={'Edit pack'} onClick={handleOpen} />
      <BasicModal open={open} setOpen={setOpen}>
        <div className={s.modalContainer}>
          <div className={s.headerModal}>
            <div>Edit pack</div>
            <Button className={s.closeButton} onClick={onClickHandlerClose}>
              ✖️
            </Button>
          </div>
          <FormPropsTextFields label={'Name pack'} defaultValue={'Hello World'} />
          <CheckboxLabels />
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
