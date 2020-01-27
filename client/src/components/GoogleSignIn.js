import React from 'react'
import { stringify } from 'querystring'

export default () => {
  const { GOOGLE_CLIENT_ID } = window.REACT_APP_SETTINGS
  const { protocol, host } = window.location

  const query = {
    access_type: 'offline',
    scope: 'email profile',
    response_type: 'code',
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: `${protocol}//${host}/google/oauth-callback`
  }

  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${stringify(query)}`

  return null
}
