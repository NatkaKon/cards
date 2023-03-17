import React, { ChangeEvent, FC, memo, useState } from 'react'

import TablePagination from '@mui/material/TablePagination'

type TablePaginationProps = {
  page: number
  pageCount: number
  cardPacksTotalCount: number
}

export const CommonTablePagination: FC<TablePaginationProps> = memo(props => {
  const [page, setPage] = useState(props.page)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [totalCount, setTotalCount] = useState(props.cardPacksTotalCount)

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      count={totalCount}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  )
})
