const express = require('express')
const process = require('process')
const Octokit = require('@octokit/rest')
const { createOAuthAppAuth } = require('@octokit/auth-oauth-app/dist-node')

const router = express.Router()

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

  res.send({ token, login })
})

router.get('/installations', async (req, res) => {
  const { token } = req.query
  const octokit = Octokit({ auth: token, previews: ['machine-man-preview'] })
  const { data } = await octokit.request('GET /user/installations')
  const { installations } = data
  res.send(installations)
})

module.exports = router