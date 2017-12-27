import {
  composeValidators,
  combineValidators,
  isRequired,
  matchesField
} from 'revalidate';
import isValidEmail from '../common/validation';

const validateSignUp = combineValidators({
  username: composeValidators(
    isRequired('Email'),
    isValidEmail('Email')
  )(),
  fullname: isRequired('Full name'),
  password: isRequired('Password'),
  confirmPassword: composeValidators(
    isRequired('Confirm password'),
    matchesField('password')({
      message: 'Passwords do not match',
    }))()
});

const validateSignIn = combineValidators({
  username: composeValidators(
    isRequired('Email'),
    isValidEmail('Email')
  )(),
  password: isRequired('Password')
});

export {validateSignIn, validateSignUp};
