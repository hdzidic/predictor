export default function(state, action) {
  if (action.type === 'PREDICTION_MADE') {
    return state.map((fixture) => {
      if (action.payload.fixture === fixture) {
        fixture.prediction = action.payload.prediction;
      }
      return fixture;
    })
  }

  if (action.type === 'DISPLAY_FIXTURES') {
    return action.payload.map(({homeTeamName, awayTeamName}) => {
      return {homeTeamName, awayTeamName};
    });
  }

  return [];
}
