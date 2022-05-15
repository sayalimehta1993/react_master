import React from 'react';
import TablePagination from '@mui/material/TablePagination';

const Pagination = ({ count, page, max, setPage, setMax }) => {
  console.log('We are in Pagination page');
  return (
    <TablePagination
      component='div'
      count={count}
      page={page}
      onPageChange={(event, newPage) => {
        setPage(newPage);
      }}
      rowsPerPage={max}
      onRowsPerPageChange={(e) => {
        setMax(parseInt(e.target.value, 10));
        setPage(0);
      }}
      rowsPerPageOptions={[1, 2, 5, 10, 25, 50, 100]}
    />
  );
}

export default Pagination;