import React, {Component} from 'react';
import { Button, Row, Col, Panel, Alert } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {predictResult, getFixtures, savePredictions} from '../actions/index';
import Fixture from '../components/fixture';
import {results} from '../common/constants';

import './fixtureList.css';

class FixtureList extends Component {
  componentWillMount() {
    this.props.getFixtures();
  }

  savePredictions = () => this.props.savePredictions(this.props.fixtures.matches);
  submit = prediction => this.props.predictResult(prediction);

  renderPanel() {
    return <div>
      {this.renderList()}
      <br/>
      {
        this.props.fixtures.success && <Alert bsStyle='success'>Saved successfully</Alert>
      }
      {
        this.props.fixtures.error && <Alert bsStyle='danger'>{this.props.fixtures.error}</Alert>
      }
    </div>
  }

  renderList() {
    return this.props.fixtures.matches && this.props.fixtures.matches.map((fixture) => {
      return <Fixture key={fixture.homeTeamName}
        fixture={fixture}
        predictHomeWin={() => this.submit({fixture, prediction: results.HOME_WIN})}
        predictDraw={() => this.submit({fixture, prediction: results.DRAW})}
        predictAwayWin={() => this.submit({fixture, prediction: results.AWAY_WIN})}
        />;
    });
  }

  render() {
    if (!this.props.fixtures) {
      return <div>Loading ...</div>;
      // TODO: add loader
    }
    return <div>
      <Row>
        <Col lg={6} lgOffset={3} md={8} mdOffset={2} sm={10} smOffset={1} xs={12}>
          <Panel bsStyle='primary' header={'Premier League Fixtures'}>{this.renderPanel()}</Panel>
        </Col>
      </Row>
      <Row>
        <Col lg={2} lgOffset={3} md={3} mdOffset={2} sm={4} smOffset={1} xs={5}>
          <Link className='btn btn-danger btn-block' to='/'>Cancel</Link>
        </Col>
        <Col lg={2} lgOffset={2} md={3} mdOffset={2} sm={4} smOffset={2} xs={5} xsOffset={2}>
          <Button className='btn btn-primary btn-block' onClick={this.savePredictions} to='/'>Save</Button>
        </Col>
      </Row>
    </div>
  }
}

function mapStateToProps({fixtures}) {
  return {fixtures};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({predictResult, getFixtures, savePredictions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FixtureList)
