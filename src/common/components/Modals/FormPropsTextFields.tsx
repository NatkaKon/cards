import * as React from 'react'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

export const FormPropsTextFields = () => {
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
          label="Pack name"
          defaultValue="Hello World"
          variant="filled"
        />
      </div>
    </Box>
  )
}
