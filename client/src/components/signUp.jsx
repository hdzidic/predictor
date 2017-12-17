import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Row, Col, Panel } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {
  composeValidators,
  combineValidators,
  isRequired,
  matchesField
} from 'revalidate'

import isValidEmail from '../common/validation';
import ReduxFormControl from '../common/ReduxFormControl.jsx';

import './signUp.css'

const validate = combineValidators({
  email: composeValidators(
    isRequired('Email'),
    isValidEmail('Email')
  )(),
  fullName: isRequired('Full name'),
  password: isRequired('Password'),
  confirmPassword: composeValidators(
    isRequired('Confirm password'),
    matchesField('password')({
      message: 'Passwords do not match',
    }))()
});

let SignUpForm = props => {
  const { handleSubmit, submitting } = props
  return <form onSubmit={handleSubmit}>
    <Row>
      <Col lg={6} lgOffset={3} md={8} mdOffset={2} sm={10} smOffset={1} xs={12}>
        <Panel bsStyle='primary' header={'Create a Predictor account'}>
          <br/>
          <Row>
            <Col className='signup__label' xs={3}>
              Email
            </Col>
            <Col xs={9}>
              <Field name='email' type='email' component={ReduxFormControl}/>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col className='signup__label' xs={3}>
              Full name
            </Col>
            <Col xs={9}>
              <Field name='fullName' component={ReduxFormControl} type='text' />
            </Col>
          </Row>
          <br/>
          <Row>
            <Col className='signup__label' xs={3}>
              Password
            </Col>
            <Col xs={9}>
              <Field name='password' component={ReduxFormControl} type='password' />
            </Col>
          </Row>
          <br/>
          <Row>
            <Col className='signup__label' xs={3}>
              Confirm Password
            </Col>
            <Col xs={9}>
              <Field name='confirmPassword' component={ReduxFormControl} type='password' />
            </Col>
          </Row>
          <br/>
        </Panel>
      </Col>
    </Row>
    <Row>
      <Col lg={2} lgOffset={3} md={3} mdOffset={2} sm={4} smOffset={1} xs={5}>
        <Link className='btn btn-danger btn-block' to='/'>Cancel</Link>
      </Col>
      <Col lg={2} lgOffset={2} md={3} mdOffset={2} sm={4} smOffset={2} xs={5} xsOffset={2}>
        <Button type='submit' disabled={submitting} className='btn btn-primary btn-block'>Save</Button>
      </Col>
    </Row>
  </form>
}

export default reduxForm({
  // a unique name for the form
  form: 'signUp',
  validate
})(SignUpForm);
