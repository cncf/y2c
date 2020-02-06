import React, { useContext, forwardRef } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'

export default () => {
  const [{ username }, dispatch] = useContext(AuthContext)

  const LogOutLink = forwardRef((props, ref) => (
    <Link {...props} ref={ref} to='#' onClick={() => dispatch({ type: 'LOG_OUT' })} />
  ))

  const HomeLink = forwardRef((props, ref) => (
    <Link {...props} ref={ref} to='/'/>
  ))

  return <AppBar position="static">
    <Toolbar>
      <Box flexGrow={1}>
        <Button color='inherit' component={HomeLink}>
          <Typography variant="h6">Y2C</Typography>
        </Button>
      </Box>
      {username ? <Typography>{username}</Typography> : null}
      {username ? <Button color='inherit' component={LogOutLink}>Log Out</Button> : null}
    </Toolbar>
  </AppBar>
}
