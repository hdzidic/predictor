import React, {Component} from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import SignUpForm from '../components/signUp';
import {signUp} from '../actions/index';

class SignUpPage extends Component {
  submit = values => this.props.signUp(values);
  render() {
    return <SignUpForm onSubmit={this.submit} _error={this.props.user && this.props.user.error}/>
  }
}

function mapStateToProps({user}) {
  return {user};
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signUp: (data) => dispatch(signUp(ownProps.history, data))
  }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUpPage))
