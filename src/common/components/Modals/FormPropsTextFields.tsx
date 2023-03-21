import * as React from 'react'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
type PropsType = {
  label: string
  defaultValue: string
}
export const FormPropsTextFields = (props: PropsType) => {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="filled-required"
          label={props.label}
          defaultValue={props.defaultValue}
          variant="filled"
        />
      </div>
    </Box>
  )
}
