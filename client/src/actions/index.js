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
    .then((res) => {
        dispatch(signUpConfirmation(res.data));
        history.push('/signupconfirmation');
      })
    .catch(error => dispatch(showError((error.response && error.response.data && error.response.data.replace(/,/g, '\n')) || 'An error occurred!')));
  };
}

export function signIn(history, values) {
  return function (dispatch) {
    return axios.post('/api/users/login', values)
    .then((res) => {
        dispatch(signInConfirmation(res.data));
        history.push('/');
      })
    .catch(error => dispatch(showError((error.response && error.response.data) || 'An error occurred!')));
  };
}

export function signUpConfirmation(user) {
  localStorage.setItem('user_id', user.id);
  localStorage.setItem('user_name', user.fullname);
  return {
    type: 'SIGNUP_CONFIRMATION',
    payload: user
  }
}

export function signInConfirmation(user) {
  localStorage.setItem('user_name', user.fullname);
  localStorage.setItem('user_id', user.id);
  return {
    type: 'SIGNIN_CONFIRMATION',
    payload: user
  }
}

export function signOut(history) {
  return function (dispatch) {
    return axios.post('/api/users/signout')
    .then((res) => {
      localStorage.removeItem('user_id');
      localStorage.removeItem('user_name');
        history.push('/');
      })
    .catch();
  };
}
