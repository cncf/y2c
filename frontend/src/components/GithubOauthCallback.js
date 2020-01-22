import React, { useContext, useState } from 'react'
import history from '../history'
import AuthContext from '../contexts/AuthContext'

export default ({ location }) => {
  const { search } = location
  const [_, dispatch] = useContext(AuthContext)
  const [authenticating, setAuthenticating] = useState(false)

  const authenticate = async () => {
    setAuthenticating(true)
    const url = `/github/oauth-callback${search}`
    const response = await fetch(url)
    const { token, login } = await response.json()
    dispatch({
      type: 'GITHUB_SIGN_IN',
      payload: { token, username: login }
    })
    history.push('/')
  }

  if (!authenticating) {
    authenticate()
  }

  return null
}
