import React from 'react';
import Parse from 'parse';
// import Register from './Register';

const Playground = () => {
  const register = () => {
    const user = new Parse.User();
    user.set('username', 'sayali');
    user.set('password', 'Sayali@1993');
    user.set('email', 'sayalivetal@gmail.com');
    user.set('firstName', 'sayali');
    user.set('lastName', 'vetal');
    user
      .signUp()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    // try {
    //   await user.signUp();
    //   // Hooray! Let them use the app now.
    // } catch (error) {
    //   // Show the error message somewhere and let the user try again.
    //   alert("Error: " + error.code + " " + error.message);
    // }
  };
  return (
    <div>
      Playground
      <hr />
      <h3>Registration</h3>
      <button onClick={register}>Register</button>
    </div>
  );
};

export default Playground;
