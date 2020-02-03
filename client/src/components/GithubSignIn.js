import React from 'react'
import { stringify } from 'querystring'

export default () => {
  const { REACT_APP_CLIENT_ID } = process.env
  const { protocol, host } = window.location

  const params = {
    client_id: REACT_APP_CLIENT_ID,
    redirect_uri: `${protocol}//${host}/github/oauth-callback`
  }

  const url = `https://github.com/login/oauth/authorize?${stringify(params)}`

  return <div>
    <a href={url}>Sign in with Github</a>
  </div>
}
