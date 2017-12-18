import React from 'react'
import { reduxForm } from 'redux-form'
import { Button, Row, Col, Panel, Alert } from 'react-bootstrap';
import {Link} from 'react-router-dom';

import validate from './validateSignUp';
import FormControl from '../common/formControl';

import './signUp.css';

let SignUpForm = props => {
  const { handleSubmit, submitting, _error } = props
  return <form onSubmit={handleSubmit}>
    <Row>
      <Col lg={6} lgOffset={3} md={8} mdOffset={2} sm={10} smOffset={1} xs={12}>
        <Panel bsStyle='primary' header={'Create a Predictor account'}>
          <br/>
          <FormControl name='username' type='email' label='Email'/>
          <br/>
          <FormControl name='fullname' type='text' label='Full name'/>
          <br/>
          <FormControl name='password' type='password' label='Password'/>
          <br/>
          <FormControl name='confirmPassword' type='password' label='Confirm Password'/>
          <br/>
          {_error && <Alert bsStyle='danger'>A server error occured!</Alert>}
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
  form: 'signUp',
  validate
})(SignUpForm);
