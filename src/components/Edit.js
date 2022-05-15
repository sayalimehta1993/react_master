import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Parse from 'parse';

const Edit = (props) => {
  const id = props.match.params.id;
  console.log(id);
  const [state, setState] = useState({
    title: '',
    description: '',
  });
  const handleChange = (name, value) => {
    setState((st) => {
      return { ...st, [name]: value };
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const Test = Parse.Object.extend('Test');
    const test = new Test();
    test.id = id;
    test.set('title', state.title);
    test.set('description', state.description);
    test
      .save()
      .then(() => {
        props.history.push('/Master');
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
          <h3>Edit Record</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                required
                fullWidth
                name='title'
                label='Title'
                value={state.title}
                onChange={(e) => {
                  handleChange(e.target.name, e.target.value);
                }}
              />
            </div>
            <div style={{ marginTop: '25px' }}>
              <TextField
                required
                fullWidth
                name='description'
                label='Description'
                value={state.description}
                multiline
                rows={5}
                onChange={(e) => {
                  handleChange(e.target.name, e.target.value);
                }}
              />
            </div>
            <div style={{ marginTop: '25px' }}>
              <Button type='submit' fullWidth variant='contained'>
                Submit
              </Button>
            </div>
          </form>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Edit;
