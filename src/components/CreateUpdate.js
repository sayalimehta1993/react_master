import React, { useState } from 'react';
import { configToDo } from '../utils/config';
import MyForm from '../widgets/MyForm';

const CreateUpdate = () => {
  const [values, setValues] = useState();
  const [errors, setErrors] = useState();
  const handleChange = () => {};
  const handleBlur = () => {};
  return (
    <div>
      <h2>Create Record</h2>
      <MyForm
        config={configToDo}
        values={values}
        errors={errors}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
    </div>
  );
};

export default CreateUpdate;
