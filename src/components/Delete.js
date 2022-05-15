import React, { useEffect } from 'react';
import Parse from 'parse';

const Delete = (props) => {
  const id = props.match.params.id;
  useEffect(() => {
    const Test = Parse.Object.extend('Test');
    const test = new Test();
    test.id = id;
    test.destroy().then(() => {
      console.log('deleted successfully');
      props.history.push('/Master');
    });
  }, []);
//   return <div></div>;
};

export default Delete;
