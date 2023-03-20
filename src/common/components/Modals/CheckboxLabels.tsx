import * as React from 'react'

import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'

export const CheckboxLabels = () => {
  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Private pack" />
    </FormGroup>
  )
}
