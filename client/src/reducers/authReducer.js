export default (state, action) => {
  switch (action.type) {
    case 'GITHUB_SIGN_IN':
      const { token, username } = action.payload
      return { ...state, token, username }
    case 'GOOGLE_SIGN_IN':
      const { email } = action.payload
      return { ...state, email }
    case 'LOG_OUT':
      return {}
    default:
      return state
  }
}
