import * as React from 'react'

import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { buttonStyle } from './Learning'

const answerBoxStyle = { display: 'flex', paddingBottom: '20px' }
const answerStyle = { fontWeight: 'bold', paddingRight: '10px' }
const formControlStyle = { paddingBottom: '15px' }

type AnswerPropsType = {
  onClick: (newGrade: number) => void
  answer: string
  cardGrade: number
}

export const Answer = (props: AnswerPropsType) => {
  const [newGrade, setNewGrade] = React.useState(String(props.cardGrade))
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewGrade((event.target as HTMLInputElement).value)
  }

  return (
    <>
      <Box sx={answerBoxStyle}>
        <div style={answerStyle}>Answer:</div>
        <div>{props.answer}</div>
      </Box>
      <FormControl sx={formControlStyle}>
        <FormLabel id="demo-radio-buttons-group-label">Rate yourself:</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={newGrade}
          onChange={handleChange}
        >
          <FormControlLabel value="0" control={<Radio />} label="Didn't know" />
          <FormControlLabel value="1" control={<Radio />} label="Forgot" />
          <FormControlLabel value="2" control={<Radio />} label="A lot of thought" />
          <FormControlLabel value="3" control={<Radio />} label="Confused" />
          <FormControlLabel value="4" control={<Radio />} label="Knew the answer" />
        </RadioGroup>
      </FormControl>
      <Button
        onClick={() => props.onClick(+newGrade)}
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
