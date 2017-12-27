import React from 'react';
import {Row, Col, Button} from 'react-bootstrap';

import {results} from '../common/constants';

const Fixture = (props) => {
  const {fixture, predictHomeWin, predictDraw, predictAwayWin} = props;
  return <div key={fixture.homeTeamName}>
    <Row>
      <Col sm={7} smOffset={1} xs={6}>{`${fixture.homeTeamName} - ${fixture.awayTeamName}`}</Col>
      <Col xs={2} sm={1}>
        <Button
          bsStyle={fixture.prediction === results.HOME_WIN ? 'primary' : 'default'}
          onClick={predictHomeWin}>{results.HOME_WIN}</Button>
      </Col>
      <Col xs={2} sm={1}>
        <Button
          bsStyle={fixture.prediction === results.DRAW ? 'primary' : 'default'}
          onClick={predictDraw}>x</Button>
      </Col>
      <Col xs={2} sm={1}>
        <Button
          bsStyle={fixture.prediction === results.AWAY_WIN ? 'primary' : 'default'}
          onClick={predictAwayWin}>{results.AWAY_WIN}</Button>
      </Col>
    </Row>
    <br/>
  </div>;
}

export default Fixture;
