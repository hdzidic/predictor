export function predictResult(fixture) {
  return {
    type: 'PREDICTION_MADE',
    payload: fixture
  };
}
