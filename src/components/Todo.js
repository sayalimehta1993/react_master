import React, { useState,useEffect,useRef } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Parse from 'parse';

import Paper from '@mui/material/Paper';
// import useGetRecords from '../hooks/useGetRecords';
import { Link } from 'react-router-dom';

const View = () => {
  const [records, setRecords] = useState({
    results: [],
    count: 0,
  });
  const subscription = useRef(null);
  useEffect(() => {
    const createRecord = (obj) => {
      setRecords((st) => {
        return { ...st, count: st.count + 1, results: [obj, ...st.results] };
      });
    };
    const updateRecord = (obj) => {
      setRecords((st) => {
        const res = [...st.results];
        let index = res.findIndex((rec) => {
          return obj.id === rec.id;
        });

        if (index !== -1) {
          res.splice(index, 1, obj);
        }
        return { ...st, results: res };
      });
    };
    const deleteRecord = (obj) => {
      setRecords((st) => {
        const res = [...st.results];
        let index = res.findIndex((rec) => {
          return obj.id === rec.id;
        });

        if (index !== -1) {
          res.splice(index, 1);
        }
        return { ...st, results: res, count: st.count - 1 };
      });
    };

    const getRecordLiveQuery = async () => {
      const query = new Parse.Query('TestTodo');
      // console.log("jhdfjh")
      // query.limit(3);
      if (subscription && subscription.current) {
        await subscription.current.unsubscribe();
      }

      subscription.current = await query.subscribe();
      subscription.current.on('open', () => {
        console.log('subscription opened');
      });
      subscription.current.on('create', (object) => {
        console.log('object created', object);
        createRecord(object);
      });
      subscription.current.on('update', (object) => {
        console.log('object updated', object);
        updateRecord(object);
      });
      subscription.current.on('enter', (object) => {
        console.log('object entered', object);
        updateRecord(object);
      });
      subscription.current.on('leave', (object) => {
        console.log('object left', object);
        deleteRecord(object);
      });
      subscription.current.on('delete', (object) => {
        console.log('object deleted', object);
        deleteRecord(object);
      });
      subscription.current.on('close', () => {
        console.log('subscription closed');
      });
    };
    const getRecords = () => {
      // const Test = Parse.Object.extend("Test");
      const query = new Parse.Query('TestTodo');
      query.withCount();
      // query.limit(3);
      query.descending('createdAt'); //createdAt is field name of table
      // query.equalTo('title' ,'Mango');
      query
        .find()
        .then((data) => {
          setRecords((st) => {
            return { ...st, ...data };
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    getRecords();
    const process = async () => {
      await getRecordLiveQuery();
    };
    process();
  }, []);
  useEffect(()=>{
    return () =>{
      console.log("return a function in useEffect");
      if(subscription && subscription.current){
        subscription.current.unsubscribe();
      }
    }
   
  },[])
  console.log(records);
  return (
    <div>
      <h3>Todo Items</h3>
      <div>
        <Link to='/Create'>Add Records</Link>
      </div>
      <div style={{ marginBottom: '15px' }}>
        Total records found:{records.count}
      </div>
      <div>
        <input type='text' />
      </div>
      <div>
        {records.results &&
          records.results.length > 0 &&
          records.results.map((rec) => {
            return (
              <Paper
                style={{ marginBottom: '15px', padding: '20px' }}
                key={rec.id}
                elevation={3}
              >
                {rec.get('todo')}
                <Link to={`/edit/${rec.id}`}>Edit</Link>|
                {/* <Link to={`/Delete/${rec.id}`}>Delete</Link>|
                <Link to={`/Details/${rec.id}`}>Details</Link> */}
              </Paper>
            );
          })}
      </div>
    </div>
  );
};
const Add = () => {
  const [state, setState] = useState({
    todo: '',
  });
  const handleChange = (name, value) => {
    setState((st) => {
      return { ...st, [name]: value };
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(state);
    const Test = Parse.Object.extend('TestTodo');
    const test = new Test();

    test.set('todo', state.todo);

    test.set('user', Parse.User.current());

    const acl = new Parse.ACL();
    acl.setPublicReadAccess(true);
    acl.setPublicWriteAccess(true);
    test.setACL(acl);
    test
      .save()
      .then((data) => {
        console.log(data);
        setState({ todo: '' });
        // props.history.push('/Master');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(state);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            required
            fullWidth
            name='todo'
            label='Title'
            value={state.title}
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
    </div>
  );
};

const Todo = (props) => {
  const [state, setState] = useState({
    todo: '',
  });
  const handleChange = (name, value) => {
    setState((st) => {
      return { ...st, [name]: value };
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(state);
    const Test = Parse.Object.extend('TestTodo');
    const test = new Test();

    test.set('todo', state.todo);

    test.set('user', Parse.User.current());

    const acl = new Parse.ACL();
    acl.setPublicReadAccess(true);
    acl.setPublicWriteAccess(true);
    test.setACL(acl);
    test
      .save()
      .then((data) => {
        console.log(data);
        setState({ todo: '' });
        // props.history.push('/Master');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(state);
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='sm'>
        <Box sx={{ height: '100vh' }}>
          <h3>Add Record</h3>
          <Add />
          <View />
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Todo;
