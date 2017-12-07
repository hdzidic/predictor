import React, {Component} from 'react';

import {connect} from 'react-redux';

class FixtureList extends Component {
  renderList() {
    return this.props.fixtures.map((fixture) => {
      return <li>{`${fixture.home} - ${fixture.away}`}</li>;
    })
  }
  render() {
    return <ul>{this.renderList()}</ul>
  }
}

function mapStateToProps(state) {
  return {
    fixtures: state.fixtures
  };
}

export default connect(mapStateToProps)(FixtureList)
