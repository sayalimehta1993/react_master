import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Parse from 'parse';

const CreateUpdate = (props) => {
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
    console.log(state);
    const Test = Parse.Object.extend('Test');
    const test = new Test();

    test.set('title', state.title);
    test.set('description', state.description);
    test.set('user', Parse.User.current());
    
    const acl = new Parse.ACL();
    acl.setPublicReadAccess(true);
    acl.setPublicWriteAccess(true);
    test.setACL(acl);
    test
      .save()
      .then((data) => {
        console.log(data);
        setState({ title: '', description: '' });
        // props.history.push('/Master');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='sm'>
        <Box sx={{ height: '100vh' }}>
          <h3>Add Record</h3>
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

export default CreateUpdate;
