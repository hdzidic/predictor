import axios from 'axios';
const URL = '/api/fixtures';

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
    return axios.get(URL).then(
      res => dispatch(displayFixtures(res)),
      error => dispatch(showError(error))
    );
  };
}
