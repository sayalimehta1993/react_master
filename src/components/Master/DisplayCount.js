import React from 'react';

const DisplayCount = ({ count }) => {
  console.log('We are in DisplayCount page');
  return <div>Total Records Found: {count}</div>;
}

export default DisplayCount;