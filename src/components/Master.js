import React, { useState, useEffect, useRef } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Parse from 'parse';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
// import useGetRecords from '../hooks/useGetRecords';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';

const Master = () => {
  // const records = useGetRecords();
  // console.log(records);
  const [records, setRecords] = useState({
    results: [],
    count: 0,
    keyword: '', //this will be changed when someone will put input in the input box of keyword.
  });
  const [keyword, setKeyword] = useState(null); //this will be changed when someone will click the search button and keyword value is updated.

  //for pagination
  const [page, setPage] = useState(0);
  const [max, setMax] = useState(2);

  const subscription = useRef(null);
  const handleChange = (name, value) => {
    setRecords((st) => {
      return { ...st, [name]: value };
    });
  };
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
      const query = new Parse.Query('Test');
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
      const query = new Parse.Query('Test');
      query.withCount();

      query.descending('createdAt'); //createdAt is field name of table
      // query.equalTo('title' ,'Mango');
      if (keyword) {
        query.matches('title', keyword, 'i');
      }
      query.skip(page * max);
      query.limit(max);
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
  }, [keyword, page, max]);
  useEffect(() => {
    return () => {
      console.log('return a function in useEffect');
      if (subscription && subscription.current) {
        subscription.current.unsubscribe();
      }
    };
  }, []);
  console.log(records);
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='sm'>
        <Box sx={{ height: '100vh' }}>
          <h3>Master</h3>
          <div>
            <Link to='/Create'>Add Records</Link>
          </div>
          <div>
            <TextField
              required
              fullWidth
              name='keyword'
              label='keyword'
              value={records.keyword}
              onChange={(e) => {
                handleChange(e.target.name, e.target.value);
              }}
            />
          </div>
          <div style={{ marginTop: '15px', marginBottom: '15px' }}>
            <Button
              variant='outlined'
              fullWidth
              onClick={(e) => {
                setKeyword(records.keyword);
                console.log('hi');
              }}
            >
              Search
            </Button>
          </div>
          <div style={{ marginBottom: '15px' }}>
            Total records found:{records.count}
          </div>
          <div>
            <TablePagination
              component='div'
              count={records.count}
              page={page}
              onPageChange={(event, newPage) => {
                setPage(newPage);
              }}
              rowsPerPage={max}
              onRowsPerPageChange={(e) => {
                setMax(parseInt(e.target.value, 10));
                setPage(0);
              }}
              rowsPerPageOptions={[1, 2, 5, 10, 20, 25, 100]}
            />
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
                    {rec.get('title')}
                    <Link to={`/edit/${rec.id}`}>Edit</Link>|
                    <Link to={`/Delete/${rec.id}`}>Delete</Link>|
                    <Link to={`/Details/${rec.id}`}>Details</Link>
                  </Paper>
                );
              })}
          </div>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Master;
