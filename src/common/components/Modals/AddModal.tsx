import Button from '@mui/material/Button'

import { buttonStyle } from '../../constants/form-button-style'

import { BasicModal } from './BasicModal'
import s from './Modal.module.css'

export const AddModal = () => {
  return (
    <BasicModal>
      <div className={s.modalContainer}>
        <div className={s.headerModal}>
          <div>Add new pack</div>
          <Button className={s.closeButton}>✖️</Button>
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
          >
            Save
          </Button>
        </div>
      </div>
    </BasicModal>
  )
}
