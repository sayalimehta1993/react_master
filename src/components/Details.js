import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Parse from 'parse';

const Details = (props) => {
  const id = props.match.params.id;
  console.log(id);
  const [state, setState] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    const Test = Parse.Object.extend('Test');
    const query = new Parse.Query(Test);
    query
      .get(id)
      .then((data) => {
        setState((st) => {
          return {
            ...st,
            title: data.get('title'),
            description: data.get('description'),
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='sm'>
        <Box sx={{ height: '100vh' }}>
          <h3>Details of Record</h3>
          <div>
            <strong>Title:</strong>
            <br />
            {state.title}
          </div>
          <div style={{ marginTop: '25px' }}>
            <strong>Description:</strong>
            <br />
            {state.description}
          </div>
          <div style={{ marginTop: '25px' }}></div>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Details;
