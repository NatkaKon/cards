import React, { FC, memo } from 'react'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

type PropsType = {
  message: string
}

export const EmptyMessage: FC<PropsType> = memo(props => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          {props.message}
        </Typography>
      </Grid>
    </Grid>
  )
})
