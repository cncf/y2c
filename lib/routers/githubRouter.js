const express = require('express')
const process = require('process')
const { stringify } = require('querystring')
const Octokit = require('@octokit/rest')
const { createOAuthAppAuth } = require('@octokit/auth-oauth-app/dist-node')
const { request } = require('@octokit/request/dist-node')

const router = express.Router()

router.get('/sign-in', async (req, res) => {
  const params = {
    client_id: process.env.CLIENT_ID,
    redirect_uri: `${process.env.BASE_URL}/github/oauth-callback`
  }

  const url = `https://github.com/login/oauth/authorize?${stringify(params)}`
  res.render('signIn.ejs', { url })
})

router.get('/oauth-callback', async (req, res) => {
  const { code, installation_id } = req.query

  const auth = createOAuthAppAuth({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    code
  })

  const { token } = await auth({ type: 'token' })
  const octokit = Octokit({ auth: token })
  const response = await octokit.users.getAuthenticated()
  const { login } = response.data

  req.session.githubToken = token
  req.session.githubUser = login

  res.redirect(installation_id ? `/github/installations/${installation_id}` : '/')
})

router.get('/installations/:installation_id', async (req, res) => {
  const { installation_id } = req.params
  const { githubToken } = req.session

  const { data } = await request('GET /user/installations/:installation_id/repositories', {
    headers: {
      authorization: `token ${githubToken}`,
      accept: 'application/vnd.github.machine-man-preview+json'
    },
    installation_id
  })
  const { repositories } = data

  res.render('installation.ejs', { repositories })
})

module.exports = router
