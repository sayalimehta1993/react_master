import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const SearchBar = ({ state, handleChange, setKeyword, setPage }) => {
  console.log('We are in SearchBar page');
  return (
    <>
      <div>
        <TextField
          fullWidth
          required
          label='Keyword'
          name='keyword'
          value={state.keyword}
          onChange={(event) => {
            handleChange('keyword', event.target.value);
          }}
        />
      </div>
      <div style={{ marginTop: '15px', marginBottom: '25px' }}>
        <Button
          variant='outlined'
          fullWidth
          onClick={() => {
            setKeyword(state.keyword);
            setPage(0);
          }}
        >
          Search
        </Button>
      </div>
    </>
  );
}

export default SearchBar;