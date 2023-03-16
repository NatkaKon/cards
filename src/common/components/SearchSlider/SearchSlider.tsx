import React, { ChangeEvent, FC, useState } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Input from '@mui/material/Input'
import Slider from '@mui/material/Slider'

const SliderStyle = {
  width: 147,
  height: 6,
  '& .MuiSlider-thumb': {
    color: 'white',
    border: '1px solid #81c784',
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
  },
}

type SliderProps = {
  min: number
  max: number
}

const MIN_DISTANCE = 1

export const SearchSlider: FC<SliderProps> = props => {
  const [values, setValues] = useState<number[]>([props.min, props.max])

  const handleSliderChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (newValue[1] - newValue[0] < MIN_DISTANCE) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - MIN_DISTANCE)

        setValues([clamped, clamped + MIN_DISTANCE])
      } else {
        const clamped = Math.max(newValue[1], MIN_DISTANCE)

        setValues([clamped - MIN_DISTANCE, clamped])
      }
    } else {
      setValues(newValue as number[])
    }
  }

  const handleMinChange = (event: ChangeEvent<HTMLInputElement>) => {
    const copyValues = [...values]

    copyValues[0] = event.target.value === '' ? 0 : Number(event.target.value)

    setValues(copyValues)
  }

  const handleMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const copyValues = [...values]

    copyValues[1] = event.target.value === '' ? 0 : Number(event.target.value)

    setValues(copyValues)
  }

  const handleMinInputBlur = () => {
    if (values[0] < 0) {
      const copyValues = [...values]

      copyValues[0] = 0

      setValues(copyValues)
    } else if (values[0] > props.max) {
      const copyValues = [...values]

      copyValues[0] = props.max

      setValues(copyValues)
    }
  }

  const handleMaxInputBlur = () => {
    if (values[1] < 0) {
      const copyValues = [...values]

      copyValues[1] = 0

      setValues(copyValues)
    } else if (values[1] > props.max) {
      const copyValues = [...values]

      copyValues[1] = props.max

      setValues(copyValues)
    }
  }

  return (
    <Box sx={{ width: 300, m: 2 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>
          <Input
            value={values[0]}
            size="small"
            onChange={handleMinChange}
            onBlur={handleMinInputBlur}
            inputProps={{
              step: 1,
              min: 0,
              max: values[1],
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
            sx={{ width: 50 }}
          />
        </Grid>
        <Grid item>
          <Slider
            sx={SliderStyle}
            value={values}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            disableSwap
          />
        </Grid>
        <Grid item>
          <Input
            value={values[1]}
            size="small"
            onChange={handleMaxChange}
            onBlur={handleMaxInputBlur}
            inputProps={{
              step: 1,
              min: 0,
              max: values[1],
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
            sx={{ width: 50 }}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
