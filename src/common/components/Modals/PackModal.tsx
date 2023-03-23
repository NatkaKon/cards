import React, { Dispatch, FC, ReactNode } from 'react'

import Button from '@mui/material/Button'

import { buttonStyle } from '../../constants/form-button-style'

import { BasicModal } from './BasicModal'
import { CheckboxLabels } from './CheckboxLabels'
import { FormPropsTextFields } from './FormPropsTextFields'
import s from './Modal.module.css'

type PropsType = {
  childrenTitle: ReactNode
  open: boolean
  setOpen: Dispatch<React.SetStateAction<boolean>>
  packName: string
  setPackName: Dispatch<React.SetStateAction<string>>
  onSave: () => void
}

export const PackModal: FC<PropsType> = props => {
  const onClickHandlerClose = () => {
    props.setOpen(false)
    props.setPackName('')
  }

  const handleOnTextFieldChange = (newValue: string) => {
    props.setPackName(newValue)
  }

  const onClickHandlerSave = () => {
    props.onSave()
  }

  return (
    <BasicModal open={props.open} setOpen={props.setOpen}>
      <div className={s.modalContainer}>
        <div className={s.headerModal}>
          {props.childrenTitle}
          <Button className={s.closeButton} onClick={onClickHandlerClose}>
            ✖️
          </Button>
        </div>
        <FormPropsTextFields
          label={'Name pack'}
          value={props.packName}
          onChange={handleOnTextFieldChange}
        />
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
  )
}
