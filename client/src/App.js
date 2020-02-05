import React, { useEffect, useReducer, useState } from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import NavBar from './components/NavBar'
import Home from './components/Home'
import GithubOauthCallback from './components/GithubOauthCallback'
import GithubSignIn from './components/GithubSignIn'
import GoogleOauthCallback from './components/GoogleOauthCallback'
import GoogleSignIn from './components/GoogleSignIn'
import PrivateRoute from './components/PrivateRoute'
import Webhooks from './components/Webhooks'
import history from './history';
import AuthContext from './contexts/AuthContext'
import SnackbarContext from './contexts/SnackbarContext'
import authReducer from './reducers/authReducer'
import storage from './storage'
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

export default () => {
  const initialState = storage.get('token', 'username', 'email')
  const [{ token, username, email }, dispatch] = useReducer(authReducer, initialState);
  const [snackbar, setSnackbar] = useState({})

  useEffect(() => storage.set({ token, username, email }), [token, username, email])

  return (
    <AuthContext.Provider value={[{ token, username, email }, dispatch]}>
      <SnackbarContext.Provider value={[snackbar, setSnackbar]}>
        <Router history={history}>
          <CssBaseline/>
          <NavBar/>
          <Snackbar open={!!snackbar.message} autoHideDuration={5000} onClose={() => setSnackbar({})}>
            <Alert severity={snackbar.severity} variant="filled">{snackbar.message}</Alert>
          </Snackbar>
          <Container>
            <Switch>
              <PrivateRoute exact path="/" component={Home}/>
              <Route path="/github/oauth-callback" component={GithubOauthCallback}/>
              <Route path="/github/sign-in" component={GithubSignIn}/>
              <Route path="/google/oauth-callback" component={GoogleOauthCallback}/>
              <PrivateRoute path="/google/sign-in" component={GoogleSignIn}/>
              <PrivateRoute path="/webhooks" component={Webhooks}/>
            </Switch>
          </Container>
        </Router>
      </SnackbarContext.Provider>
    </AuthContext.Provider>
  )
}
