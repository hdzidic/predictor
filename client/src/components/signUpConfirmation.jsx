import React from 'react'
import { Row, Col } from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default () => {
  return <Row>
      <Col lg={6} lgOffset={3} md={8} mdOffset={2} sm={10} smOffset={1} xs={12}>
        <h1>Welcome to Predictor!</h1>
        <p>Please check your email to complete the registration process.</p>
        <br/>
        <p><Link className='btn btn-primary' to='/fixtures'>Start predicting</Link></p>
      </Col>
    </Row>;
}
