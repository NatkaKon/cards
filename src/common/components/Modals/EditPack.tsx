import React, { Dispatch, FC } from 'react'

import Button from '@mui/material/Button'

import { useAppDispatch } from '../../../app/store'
import { updatePackTC } from '../../../features/Packs/packsReducer'
import { buttonStyle } from '../../constants/form-button-style'

import { BasicModal } from './BasicModal'
import { CheckboxLabels } from './CheckboxLabels'
import { FormPropsTextFields } from './FormPropsTextFields'
import s from './Modal.module.css'

type PropsType = {
  open: boolean
  setOpen: Dispatch<React.SetStateAction<boolean>>
  packId: string
  packName: string
  setPackName: Dispatch<React.SetStateAction<string>>
}

export const EditPack: FC<PropsType> = props => {
  const dispatch = useAppDispatch()

  const onClickHandlerClose = () => {
    props.setOpen(false)
  }

  const handleOnTextFieldChange = (newValue: string) => {
    props.setPackName(newValue)
  }

  const onClickHandlerSave = () => {
    dispatch(updatePackTC({ _id: props.packId, name: props.packName }))
    props.setOpen(false)
  }

  return (
    <>
      <BasicModal open={props.open} setOpen={props.setOpen}>
        <div className={s.modalContainer}>
          <div className={s.headerModal}>
            <div>Edit pack</div>
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
    </>
  )
}
