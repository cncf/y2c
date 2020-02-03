import React, { useEffect, useReducer } from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import GithubOauthCallback from './components/GithubOauthCallback'
import GithubSignIn from './components/GithubSignIn'
import GoogleOauthCallback from './components/GoogleOauthCallback'
import GoogleSignIn from './components/GoogleSignIn'
import PrivateRoute from './components/PrivateRoute'
import Webhooks from './components/Webhooks'
import history from './history';
import AuthContext from './contexts/AuthContext'
import authReducer from './reducers/authReducer'
import storage from './storage'

export default () => {
  const initialState = storage.get('token', 'username', 'email')
  const [{ token, username, email }, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => storage.set({ token, username, email }), [token, username, email])

  return (
    <AuthContext.Provider value={[{ token, username, email }, dispatch]}>
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/" component={Home}/>
          <Route path="/github/oauth-callback" component={GithubOauthCallback}/>
          <Route path="/github/sign-in" component={GithubSignIn}/>
          <Route path="/google/oauth-callback" component={GoogleOauthCallback}/>
          <PrivateRoute path="/google/sign-in" component={GoogleSignIn}/>
          <PrivateRoute path="/webhooks" component={Webhooks}/>
        </Switch>
      </Router>
    </AuthContext.Provider>
  )
}
