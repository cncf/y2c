import { useContext, useState } from 'react'
import history from '../history'
import AuthContext from '../contexts/AuthContext'
import SnackbarContext from '../contexts/SnackbarContext'

export default ({ location }) => {
  const { search } = location
  const dispatch = useContext(AuthContext)[1]
  const setSnackbar = useContext(SnackbarContext)[1]
  const [authenticating, setAuthenticating] = useState(false)

  const authenticate = async () => {
    setAuthenticating(true)
    const url = `/api/github/oauth-callback${search}`
    const response = await fetch(url)
    const { token, login } = await response.json()
    const message = search.indexOf('installation_id') > -1 ? 'Successfully installed app' : 'Successfully authenticated'
    setSnackbar({ message, severity: 'success' })
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
