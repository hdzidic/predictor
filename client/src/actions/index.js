import axios from 'axios';

export function predictResult(fixture) {
  return {
    type: 'PREDICTION_MADE',
    payload: fixture
  };
}

export function displayFixtures(res) {
  return {
    type: 'DISPLAY_FIXTURES',
    payload: res.data.fixtures
  }
}

export function showError(error) {
  return {
    type: 'SHOW_ERROR',
    payload: error
  }
}

export function getFixtures() {
  return function (dispatch) {
    return axios.get('/api/fixtures').then(
      res => dispatch(displayFixtures(res)),
      error => dispatch(showError(error))
    );
  };
}

export function signUp(history, values) {
  return function (dispatch) {
    return axios.post('/api/users/signup', values)
    .then(() => {
        dispatch(showSignupConfirmation());
        history.push('/signupconfirmation');
      })
    .catch(error => dispatch(showError(error)))
  };
}

export function showSignupConfirmation() {
  return {
    type: 'SHOW_SIGNUP_CONFIRMATION',
    payload: null
  }
}
