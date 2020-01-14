const express = require('express')
const { google } = require('googleapis/build/src/index')
const router = express.Router()

const oauthClient = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.BASE_URL}/google/oauth-callback`
)

router.get('/sign-in', (req, res) => {
  const url = oauthClient.generateAuthUrl({
    access_type: 'offline',
    scope: ['email', 'profile']
  })

  res.redirect(url)
})

router.get('/oauth-callback', async (req, res) => {
  const { code } = req.query
  const { tokens } = await oauthClient.getToken(code)
  req.session.googleTokens = tokens
  oauthClient.setCredentials(tokens)
  const people = google.people({ version: 'v1', auth: oauthClient })
  const peopleResponse = await people.people.get({ resourceName: 'people/me', personFields: 'emailAddresses' })
  console.log(JSON.stringify(peopleResponse.data.emailAddresses))
  res.redirect('/')
})

module.exports = router
