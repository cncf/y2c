import React, { forwardRef } from 'react'
import { stringify } from 'querystring'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import GithubIcon from '@material-ui/icons/GitHub'

export default () => {
  const { REACT_APP_CLIENT_ID } = process.env
  const { protocol, host } = window.location

  const params = {
    client_id: REACT_APP_CLIENT_ID,
    redirect_uri: `${protocol}//${host}/github/oauth-callback`
  }

  const url = `https://github.com/login/oauth/authorize?${stringify(params)}`

  const SignInButton = forwardRef(({ children, ...props}, ref) => <a href={url} {...props} ref={ref}>{children}</a>)

  return <Box display="flex" justifyContent="center" my={20}>
    <Button variant='contained' size='large' component={SignInButton} startIcon={<GithubIcon />}>
      Sign in with Github
    </Button>
  </Box>
}
