import React from 'react'
import SignUpForm from '../components/signUp';

export default class SignUpPage extends React.Component {
  submit = values => {
    // print the form values to the console
    console.log(values)
  }
  render() {
    return <SignUpForm onSubmit={this.submit} />
  }
}
