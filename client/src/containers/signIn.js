import React, {Component} from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import SignInForm from '../components/signIn';
import {signIn} from '../actions/index';

class SignInPage extends Component {
  submit = values => this.props.signIn(values);
  render() {
    return <SignInForm onSubmit={this.submit} _error={this.props.user && this.props.user.error}/>
  }
}

function mapStateToProps({user}) {
  return {user};
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signIn: (data) => dispatch(signIn(ownProps.history, data))
  }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignInPage))
