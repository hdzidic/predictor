import React, {Component} from 'react';
import { Button, Row, Col, Panel } from 'react-bootstrap';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {predictResult, getFixtures} from '../actions/index';
import {Link} from 'react-router-dom';

const HOME_WIN = 1, AWAY_WIN = 2, DRAW = 0;

class FixtureList extends Component {
  componentWillMount() {
    this.props.getFixtures();
  }

  renderList() {
    return this.props.fixtures.map((fixture) => {
      return <div key={fixture.homeTeamName}>
        <Row>
          <Col sm={6} smOffset={1} xs={8}>{`${fixture.homeTeamName} - ${fixture.awayTeamName}`}</Col>
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
    return <div>
      <Row>
        <Col lg={6} lgOffset={3} md={8} mdOffset={2} sm={10} smOffset={1} xs={12}>
          <Panel bsStyle='primary' header={'Premier League Fixtures'}>{this.renderList()}</Panel>
        </Col>
      </Row>
      <Row>
        <Col lg={2} lgOffset={3} md={3} mdOffset={2} sm={4} smOffset={1} xs={5}>
          <Link className='btn btn-danger btn-block' to='/'>Cancel</Link>
        </Col>
        <Col lg={2} lgOffset={2} md={3} mdOffset={2} sm={4} smOffset={2} xs={5} xsOffset={2}>
          <Link className='btn btn-primary btn-block' to='/'>Save</Link>
        </Col>
      </Row>
    </div>
  }
}

function mapStateToProps({fixtures}) {
  return {fixtures};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({predictResult: predictResult, getFixtures: getFixtures}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FixtureList)
