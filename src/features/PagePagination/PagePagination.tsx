import React, { FC, memo } from 'react'

import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Pagination from '@mui/material/Pagination'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Typography from '@mui/material/Typography'

type PropsType = {
  page: number
  pageCount: number
  cardPacksTotalCount: number
  handleChangePage: (newPage: number) => void
  handleChangeRowsPerPage: (pageCount: number) => void
}

export const PagePagination: FC<PropsType> = memo(props => {
  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    props.handleChangePage(newPage)
  }

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    props.handleChangeRowsPerPage(parseInt(event.target.value))
    props.handleChangePage(1)
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', my: '10px' }}>
      <Pagination
        showFirstButton
        showLastButton
        size="large"
        color="primary"
        count={Math.trunc(props.cardPacksTotalCount / props.pageCount)}
        page={props.page}
        siblingCount={1}
        boundaryCount={2}
        onChange={handleChangePage}
      />
      <Typography variant="subtitle1" sx={{ mx: 2 }}>
        Show
      </Typography>
      <FormControl sx={{ m: 1 }} size="small">
        <Select
          labelId="select-small"
          variant="standard"
          value={props.pageCount.toString()}
          label="Page"
          autoWidth
          onChange={handleChangeRowsPerPage}
        >
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
        </Select>
      </FormControl>
      <Typography variant="subtitle1" sx={{ mx: 2 }}>
        Cards per Page
      </Typography>
    </Box>
  )
})
