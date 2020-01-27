import React, { useContext, useState } from 'react'
import history from '../history'
import AuthContext from '../contexts/AuthContext'

export default ({ location }) => {
  const { search } = location
  const [_, dispatch] = useContext(AuthContext)
  const [authenticating, setAuthenticating] = useState(false)

  const authenticate = async () => {
    setAuthenticating(true)
    const url = `/api/google/oauth-callback${search}`
    const response = await fetch(url)
    const { email } = await response.json()
    dispatch({
      type: 'GOOGLE_SIGN_IN',
      payload: { email }
    })
    history.push('/')
  }

  if (!authenticating) {
    authenticate()
  }

  return null
}
