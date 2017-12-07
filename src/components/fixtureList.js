import React, {Component} from 'react';
import { Button, Row, Col, Panel } from 'react-bootstrap';

import {connect} from 'react-redux';

class FixtureList extends Component {
  renderList() {
    return this.props.fixtures.map((fixture) => {
      return <div>
        <Row>
          <Col xs={4} xsOffset={2}>{`${fixture.home} - ${fixture.away}`}</Col>
          <Col xs={1}>
            <Button bsStyle={fixture.prediction === 1 && 'Primary'} >1</Button>
          </Col>
          <Col xs={1}>
            <Button bsStyle={fixture.prediction === 0 && 'Primary'}>x</Button>
          </Col>
          <Col xs={1}>
            <Button bsStyle={fixture.prediction === 2 && 'Primary'}>2</Button>
          </Col>
        </Row>
        <br/>
      </div>;
    })
  }
  render() {
    return <Panel>{this.renderList()}</Panel>
  }
}

function mapStateToProps({fixtures}) {
  return {fixtures};
}

export default connect(mapStateToProps)(FixtureList)
