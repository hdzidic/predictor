export default function (state, action) {
  if (action.type === 'SHOW_ERROR') {
    return Object.assign({}, state, {
      error: action.payload
    });
  }

  if (action.type === 'SIGNIN_CONFIRMATION' || action.type === 'SIGNUP_CONFIRMATION') {
    return Object.assign({}, state, {
      error: false,
      fullname: action.payload.fullname
    });
  }

  return state || null;
}
