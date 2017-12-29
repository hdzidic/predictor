/* global localStorage */
import axios from 'axios';

export function predictResult(fixture) {
  return {
    type: 'PREDICTION_MADE',
    payload: fixture,
  };
}

export function displayFixtures(res) {
  return {
    type: 'DISPLAY_FIXTURES',
    payload: res.data.fixtures,
  };
}

export function loginError(error) {
  return {
    type: 'LOGIN_ERROR',
    payload: error,
  };
}

export function signUpError(error) {
  return {
    type: 'SIGNUP_ERROR',
    payload: error,
  };
}

export function fixtureError(error) {
  return {
    type: 'FIXTURE_ERROR',
    payload: error,
  };
}

export function getFixtures() {
  return dispatch => axios.get('/api/fixtures')
    .then(
      res => dispatch(displayFixtures(res)),
      error => dispatch(fixtureError((error.response && error.response.data) || 'An error occurred!')),
    );
}

export function signUpConfirmation(user) {
  localStorage.setItem('user_id', user.id);
  localStorage.setItem('user_name', user.fullname);
  return {
    type: 'SIGNUP_CONFIRMATION',
    payload: user,
  };
}

export function signInConfirmation(user) {
  localStorage.setItem('user_name', user.fullname);
  localStorage.setItem('user_id', user.id);
  return {
    type: 'SIGNIN_CONFIRMATION',
    payload: user,
  };
}

export function signUp(history, values) {
  return dispatch => axios.post('/api/users/signup', values)
    .then((res) => {
      dispatch(signUpConfirmation(res.data));
      history.push('/signupconfirmation');
    })
    .catch(error => dispatch(signUpError((error.response && error.response.data && error.response.data.replace(/,/g, '\n')) || 'An error occurred!')));
}

export function signIn(history, values) {
  return dispatch => axios.post('/api/users/login', values)
    .then((res) => {
      dispatch(signInConfirmation(res.data));
      history.push('/');
    })
    .catch(error => dispatch(loginError((error.response && error.response.data) || 'An error occurred!')));
}

export function signOut(history) {
  return () => axios.post('/api/users/signout')
    .then(() => {
      localStorage.removeItem('user_id');
      localStorage.removeItem('user_name');
      history.push('/');
    })
    .catch(() => {
      localStorage.removeItem('user_id');
      localStorage.removeItem('user_name');
      history.push('/');
    });
}

export function savePredictionsConfirmation() {
  return {
    type: 'SAVE_PREDICTIONS_CONFIRMATION',
    payload: null,
  };
}

export function savePredictions() {
  return dispatch => axios.post('/api/fixtures/')
    .then(() => {
      dispatch(savePredictionsConfirmation());
    })
    .catch(error => dispatch(fixtureError((error.response && error.response.data) || 'An error occurred!')));
}
