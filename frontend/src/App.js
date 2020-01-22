import React, { useEffect, useReducer } from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import GithubOauthCallback from './components/GithubOauthCallback'
import GoogleOauthCallback from './components/GoogleOauthCallback'
import GoogleSignIn from './components/GoogleSignIn'
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
          <Route exact path="/" component={Home}/>
          <Route path="/github/oauth-callback" component={GithubOauthCallback}/>
          <Route path="/google/oauth-callback" component={GoogleOauthCallback}/>
          <Route path="/google/sign-in" component={GoogleSignIn}/>
        </Switch>
      </Router>
    </AuthContext.Provider>
  )
}
