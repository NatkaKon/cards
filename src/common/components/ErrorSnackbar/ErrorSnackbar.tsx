import React, { FC, forwardRef, memo } from 'react'

import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import { setAppError } from '../../../app/app-reducer'
import { useAppDispatch } from '../../../app/store'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const ErrorSnackbar: FC<{ errMessage: string | null }> = memo(({ errMessage }) => {
  const dispatch = useAppDispatch()

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setAppError(null))
  }

  return (
    <Snackbar open={!!errMessage} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {errMessage}
      </Alert>
    </Snackbar>
  )
})
