const express = require('express')
const { google } = require('googleapis/build/src/index')
const router = express.Router()

router.get('/oauth-callback', async (req, res) => {
  const { protocol, host } = new URL(req.get('Referrer'))

  const oauthClient = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${protocol}//${host}/google/oauth-callback`
  )

  const { code } = req.query
  const { tokens } = await oauthClient.getToken(code)
  oauthClient.setCredentials(tokens)
  const people = google.people({ version: 'v1', auth: oauthClient })
  const peopleResponse = await people.people.get({ resourceName: 'people/me', personFields: 'emailAddresses' })
  const primaryAddress = peopleResponse.data.emailAddresses.find(({ metadata }) => metadata.primary)
  res.send({ email: primaryAddress.value })
})

module.exports = router
