import * as React from 'react'
import { ChangeEvent } from 'react'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

type PropsType = {
  label: string
  defaultValue?: string
  value?: string
  onChange?: (value: string) => void
}

export const FormPropsTextFields = (props: PropsType) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    props.onChange && props.onChange(e.currentTarget.value)

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
          variant="filled"
          value={props.value && props.value}
          onChange={handleOnChange}
        />
      </div>
    </Box>
  )
}
