export default function(state, action) {
  if (action.type === 'PREDICTION_MADE') {
    const matches = state.matches.map((fixture) => {
      if (action.payload.fixture === fixture) {
        fixture.prediction = action.payload.prediction;
      }
      return fixture;
    });
    return Object.assign({}, state, {
      error: false,
      matches,
      success: false
    });
  }

  if (action.type === 'DISPLAY_FIXTURES') {
    const matches = action.payload.map(({homeTeamName, awayTeamName}) => {
      return {homeTeamName, awayTeamName};
    });
    return Object.assign({}, state, {
      error: false,
      matches,
      success: false
    });
  }

  if (action.type === 'FIXTURE_ERROR') {
    return Object.assign({}, state, {
      error: action.payload,
      success: false
    });
  }

  if (action.type === 'SAVE_PREDICTIONS_CONFIRMATION') {
    return Object.assign({}, state, {
      success: true
    });
  }

  return state || null;
}
