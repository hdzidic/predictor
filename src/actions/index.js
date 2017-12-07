import axios from 'axios';
const URL = 'http://api.football-data.org/v1/competitions/445/fixtures?matchday=16';

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
    return axios({
      url: URL,
      method: 'get',
      headers: {
        'X-Auth-Token': '1d47b8ba06f7421dadc29a4d4bac5d93'
      }
    }).then(
      res => dispatch(displayFixtures(res)),
      error => dispatch(showError(error))
    );
  };
}
