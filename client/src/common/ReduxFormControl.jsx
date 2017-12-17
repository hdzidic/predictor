import React from 'react';
import { FormControl } from 'react-bootstrap';

import './ReduxFormControl.css';

const ReduxFormControl = ({input, meta: { touched, error, warning }, ...props }) => {
    return <div>
      <FormControl {...props} {...input} />
      {touched && error && <span className='form__error'>{error}</span>}
    </div>;
};

export default ReduxFormControl;
