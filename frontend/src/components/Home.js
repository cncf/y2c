import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { stringify } from 'querystring'
import AuthContext from '../contexts/AuthContext'

export default () => {
  const { protocol, host } = window.location
  const [{ username, email }, dispatch] = useContext(AuthContext)
  const [installations, setInstallations] = useState([])

  const params = {
    client_id: process.env.REACT_APP_CLIENT_ID,
    redirect_uri: `${protocol}//${host}/github/oauth-callback`
  }

  const url = `https://github.com/login/oauth/authorize?${stringify(params)}`

  useEffect(() => {
    const fetchInstallations = async () => {
      const response = await fetch(`/github/installations?token=${localStorage.token}`)
      const data = await response.json()
      setInstallations(data)
    }

    username && fetchInstallations()
  }, [])

  if (!username) {
    return <div><a href={url}>Sign in</a></div>
  }

  return (
    <div>
      <div>Authenticated as: {username}</div>
      <div>{ email ? `Google User: ${email}` : <Link to='/google/sign-in'>Sign In with Google</Link> }</div>

      <div><a onClick={() => dispatch({ type: 'LOG_OUT' })}>Log Out</a></div>
      {
        installations.map(({ id, account }) => (
          <div key={`installation/${id}`}><a href={`/installation/${id}`}>{account.login}</a></div>
        ))
      }
    </div>
  )
}
