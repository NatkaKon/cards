import { Autocomplete } from '@mui/material'
import TextField from '@mui/material/TextField'

const options = [
  { label: 'Text', id: 1 },
  { label: 'Picture', id: 2 },
]

export const ComboBox = () => {
  return (
    <Autocomplete
      disablePortal
      id="combo-box"
      options={options}
      sx={{ width: 300 }}
      renderInput={params => <TextField {...params} label="Text" />}
    />
  )
}
