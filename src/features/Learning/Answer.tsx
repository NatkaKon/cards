import * as React from 'react'

import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { buttonStyle } from './Learning'

const answerBoxStyle = { display: 'flex', paddingBottom: '20px' }
const answerStyle = { fontWeight: 'bold', paddingRight: '10px' }
const formControlStyle = { paddingBottom: '15px' }

export const Answer = (props: { onClick: () => void }) => {
  const [value, setValue] = React.useState(`Didn't know`)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
    console.log((event.target as HTMLInputElement).value)
  }

  return (
    <>
      <Box sx={answerBoxStyle}>
        <div style={answerStyle}>Answer:</div>
        <div>answer</div>
      </Box>
      <FormControl sx={formControlStyle}>
        <FormLabel id="demo-radio-buttons-group-label">Rate yourself:</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="Didn't know" control={<Radio />} label="Didn't know" />
          <FormControlLabel value="Forgot" control={<Radio />} label="Forgot" />
          <FormControlLabel value="A lot of thought" control={<Radio />} label="A lot of thought" />
          <FormControlLabel value="Confused" control={<Radio />} label="Confused" />
          <FormControlLabel value="Knew the answer" control={<Radio />} label="Knew the answer" />
        </RadioGroup>
      </FormControl>
      <Button
        onClick={props.onClick}
        color="primary"
        variant="contained"
        size="medium"
        sx={buttonStyle}
      >
        Next
      </Button>
    </>
  )
}
