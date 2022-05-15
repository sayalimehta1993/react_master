import React from 'react';
import Paper from '@mui/material/Paper';

const Results = ({ results }) => {
  console.log('We are in RESULTS page');
  return (
    <div>
      {results &&
        results.length > 0 &&
        results.map((rec) => {
          return (
            <Paper
              key={rec.id}
              elevation={3}
              style={{ marginBottom: '15px', padding: '20px' }}
            >
              <a href={`/detail/${rec.id}`}>{rec.get('title')}</a>{' '}
              <a href={`/edit/${rec.id}`}>Edit</a> |
              <a href={`/delete/${rec.id}`}>Delete</a>
            </Paper>
          );
        })}
    </div>
  );
}

export default Results;