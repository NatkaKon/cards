import React, { Dispatch, FC, memo, ReactNode } from 'react'

import Button from '@mui/material/Button'

import { buttonStyle } from '../../constants/form-button-style'

import { BasicModal } from './BasicModal'
import { ComboBox } from './ComboBox'
import { FormPropsTextFields } from './FormPropsTextFields'
import s from './Modal.module.css'

type PropsType = {
  open: boolean
  setOpen: Dispatch<React.SetStateAction<boolean>>
  cardId?: string
  cardQuestion: string
  cardAnswer: string
  setCardQuestion: Dispatch<React.SetStateAction<string>>
  setCardAnswer: Dispatch<React.SetStateAction<string>>
  onSave: () => void
  childrenTitle: ReactNode
}

export const CardModal: FC<PropsType> = memo(props => {
  const onClickHandlerClose = () => {
    props.setOpen(false)
    props.setCardQuestion('')
    props.setCardAnswer('')
  }

  const onChangeCardQuestionHandler = (newValue: string) => {
    props.setCardQuestion(newValue)
  }

  const onChangeCardAnswerHandler = (newValue: string) => {
    props.setCardAnswer(newValue)
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
        <ComboBox />
        <FormPropsTextFields
          label={'Question'}
          value={props.cardQuestion}
          onChange={onChangeCardQuestionHandler}
        />
        <FormPropsTextFields
          label={'Answer'}
          value={props.cardAnswer}
          onChange={onChangeCardAnswerHandler}
        />
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
})
