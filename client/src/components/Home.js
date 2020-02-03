import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'

export default () => {
  const [{ username, email }, dispatch] = useContext(AuthContext)
  const [installations, setInstallations] = useState([])

  useEffect(() => {
    const fetchInstallations = async () => {
      const response = await fetch(`/api/github/installations?token=${localStorage.token}`)
      const data = await response.json()
      setInstallations(data)
    }

    fetchInstallations()
  }, [])

  return (
    <div>
      <div>Authenticated as: {username}</div>
      <div>{ email ? `Google User: ${email}` : <Link to='/google/sign-in'>Sign In with Google</Link> }</div>

      <div><a onClick={() => dispatch({ type: 'LOG_OUT' })}>Log Out</a></div>
      {
        installations.map(({ id, account }) => (
          <div key={`installation/${id}`}><a href={`/api/installation/${id}`}>{account.login}</a></div>
        ))
      }
    </div>
  )
}
