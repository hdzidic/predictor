import React from 'react';
import { Field } from 'redux-form'
import { Row, Col } from 'react-bootstrap';

import ReduxFormControl from './ReduxFormControl.jsx';

export default props => {
  const {label, name, type} = props;
  return <Row>
    <Col className='signup__label' xs={3}>
      {label}
    </Col>
    <Col xs={9}>
      <Field name={name} type={type} component={ReduxFormControl}/>
    </Col>
  </Row>;
}
