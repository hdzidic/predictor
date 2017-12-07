import React, {Component} from 'react';
import { Button, Row, Col, Panel } from 'react-bootstrap';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {predictResult} from '../actions/index';

const HOME_WIN = 1, AWAY_WIN = 2, DRAW = 0;

class FixtureList extends Component {
  renderList() {
    return this.props.fixtures.map((fixture) => {
      return <div key={fixture.id}>
        <Row>
          <Col xs={4} xsOffset={2}>{`${fixture.home} - ${fixture.away}`}</Col>
          <Col xs={1}>
            <Button
              bsStyle={fixture.prediction === HOME_WIN ? 'primary' : 'default'}
              onClick={() => this.props.predictResult({fixture, prediction: HOME_WIN})}>{HOME_WIN}</Button>
          </Col>
          <Col xs={1}>
            <Button
              bsStyle={fixture.prediction === DRAW ? 'primary' : 'default'}
              onClick={() => this.props.predictResult({fixture, prediction: DRAW})}>x</Button>
          </Col>
          <Col xs={1}>
            <Button
              bsStyle={fixture.prediction === AWAY_WIN ? 'primary' : 'default'}
              onClick={() => this.props.predictResult({fixture, prediction: AWAY_WIN})}>{AWAY_WIN}</Button>
          </Col>
        </Row>
        <br/>
      </div>;
    })
  }
  render() {
    return <Row>
      <Col xs={6} xsOffset={3}>
        <Panel bsStyle='primary' header={'Premier League Fixtures'}>{this.renderList()}</Panel>
      </Col>
    </Row>
  }
}

function mapStateToProps({fixtures}) {
  return {fixtures};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({predictResult: predictResult}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FixtureList)
