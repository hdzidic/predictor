export default function (state, action) {
  if (action.type === 'LOGIN_ERROR') {
    return Object.assign({}, state, {
      login_error: action.payload,
      signUp_error: false,
      account: null,
    });
  }

  if (action.type === 'SIGNUP_ERROR') {
    return Object.assign({}, state, {
      login_error: false,
      signUp_error: action.payload,
      account: null,
    });
  }

  if (action.type === 'LOGIN_CONFIRMATION' || action.type === 'SIGNUP_CONFIRMATION') {
    return Object.assign({}, state, {
      login_error: false,
      signUp_error: false,
      account: action.payload,
    });
  }

  return state || null;
}
