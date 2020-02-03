import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'

export default ({ component: Component, ...rest }) => {
  const { username } = useContext(AuthContext)[0]

  return <Route {...rest} render={ props => (
    username ? <Component {...props} /> : <Redirect to='/github/sign-in'/>
  )}/>
}
