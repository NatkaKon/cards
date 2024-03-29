import * as React from 'react'
import { FC, ReactNode } from 'react'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
}

type PropsType = {
  children: ReactNode
  open?: boolean
  setOpen?: (open: boolean) => void
}
export const BasicModal: FC<PropsType> = ({ open, setOpen, children }) => {
  // const [open, setOpen] = React.useState(false)
  // const handleOpen = () => setOpen(true)
  const handleClose = (): void => setOpen?.(false)

  return (
    <div>
      {/*<Button onClick={handleOpen}>Open modal</Button>*/}
      <Modal
        open={open ? open : false}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  )
}
