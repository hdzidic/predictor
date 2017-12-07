export default function(state, action) {
  if (action.type === 'PREDICTION_MADE') {
    return state.map((fixture) => {
      if (action.payload.fixture === fixture) {
        fixture.prediction = action.payload.prediction;
      }
      return fixture;
    })
  }

  return [{
    id: 1,
    home: 'Arsenal',
    away: 'Tottenham'
  },
  {
    id: 2,
    home: 'Burnley',
    away: 'Stoke City'
  }];
}
