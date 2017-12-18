export default function showError(state, action) {
  if (action.type === 'SHOW_ERROR') {
    return {
      error: true
    }
  }

  return state || {};
}
