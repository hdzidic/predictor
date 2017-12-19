import React, {Component} from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {signOut} from '../actions';
import NavHeader from '../components/navbar';

class NavBar extends Component {
  signOut = () => this.props.signOut();
  render() {
    return <NavHeader onSignOut={this.signOut} user={this.props.user}/>
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signOut: () => dispatch(signOut(ownProps.history))
  }
};

export default withRouter(connect(null, mapDispatchToProps)(NavBar));
