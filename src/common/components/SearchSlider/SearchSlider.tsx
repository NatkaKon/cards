import React, { FC, memo, useEffect, useRef, useState } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'

import { AppThunkDispatch } from '../../../app/store'
import { searchPacksByCardsNumberAC } from '../../../features/Packs/packsReducer'

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
  dispatch: AppThunkDispatch
}

const MIN_DISTANCE = 1

export const SearchSlider: FC<SliderProps> = memo(props => {
  let isFirstRender = useRef(true)

  const [values, setValues] = useState<number[]>([0, 100])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false

      return
    }

    setValues([props.min, props.max])
  }, [props.min, props.max])

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

  const handleChangeCommitted = (event: React.SyntheticEvent | Event, value: number | number[]) => {
    if (Array.isArray(value)) {
      props.dispatch(searchPacksByCardsNumberAC(value))
    }

    return
  }

  return (
    <Box sx={{ width: 270 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>
          <Typography variant="subtitle1" gutterBottom>
            {values[0]}
          </Typography>
        </Grid>
        <Grid item>
          <Slider
            sx={SliderStyle}
            value={values}
            onChange={handleSliderChange}
            onChangeCommitted={handleChangeCommitted}
            aria-labelledby="input-slider"
            valueLabelDisplay="auto"
            disableSwap
          />
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" gutterBottom>
            {values[1]}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
})
