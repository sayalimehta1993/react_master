import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SearchBar from './SearchBar';
import DisplayCount from './DisplayCount';
import Pagination from './Pagination';
import Results from './Results';
import { getRecords, getRecordsLiveQuery } from './utils';
import { Link } from 'react-router-dom';

const Master2 = () => {
  const [state, setState] = React.useState({
    results: [],
    count: 0,
    keyword: '', // this will be changed when someone will put in the input box of keyword
  });
  const [keyword, setKeyword] = React.useState(null); // this will be changed when someone will click the search button and keyword value is updated.

  // for pagination
  const [page, setPage] = React.useState(0);
  const [max, setMax] = React.useState(10);

  const subscription = React.useRef(null);

  const handleChange = (name, value) => {
    setState((st) => {
      return { ...st, [name]: value };
    });
  };

  React.useEffect(() => {
    getRecords({ keyword, page, max, setState });
  }, [keyword, max, page]);

  React.useEffect(() => {
    let current = null;
    const process = async () => {
      await getRecordsLiveQuery({ subscription, setState });
      current = subscription && subscription.current;
    };
    process();
    return () => {
      console.log('returned a function in useEffect');
      if (current) {
        current.unsubscribe();
      }
    };
  }, []);

  console.log('We are in Master page');
  console.log('state: ', state);
  return (
    <>
      <CssBaseline />
      <Container maxWidth='sm'>
        <Box sx={{ height: '100vh' }}>
          <h3>Master</h3>
          <Link to='/Create'>Add Records</Link>
          <SearchBar
            state={state}
            handleChange={handleChange}
            setKeyword={setKeyword}
            setPage={setPage}
          />
          <DisplayCount count={state.count} />
          <Pagination
            count={state.count}
            page={page}
            max={max}
            setPage={setPage}
            setMax={setMax}
          />
          <Results results={state.results} />
        </Box>
      </Container>
    </>
  );
}

export default Master2;