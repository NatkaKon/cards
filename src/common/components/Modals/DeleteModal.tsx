import Button from '@mui/material/Button'

import { buttonStyle } from '../../constants/form-button-style'

import { BasicModal } from './BasicModal'
import s from './Modal.module.css'

export const DeleteModal = () => {
  return (
    <BasicModal>
      <div className={s.modalContainer}>
        <div className={s.headerModal}>
          <div>Delete pack</div>
          <Button className={s.closeButton}>✖️</Button>
        </div>
        <div className={s.textAttention}>
          Do you really want to remove <strong>Pack Name?</strong> {'\n'}All cards will be deleted.
        </div>
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
            color="error"
            variant="contained"
            size="medium"
            sx={buttonStyle}
            className={s.buttonBottom}
          >
            Delete
          </Button>
        </div>
      </div>
    </BasicModal>
  )
}
