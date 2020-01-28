const { google } = require('googleapis/build/src/index')
const datastore = require('datastore')

const auth = new google.auth.GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/calendar']
});

// const serviceAccountAuthClient = await auth.getClient()
// serviceAccountAuthClient.subject = 'admin@deploydemo.xyz'
// const { googleTokens } = req.session
// oauth2Client.setCredentials(googleTokens)
// const calendarApi = google.calendar({ version: 'v3', auth: serviceAccountAuthClient })
// const { calendarId, description, summary, timeZone } = req.body
// const startTime = (new Date(`${req.body.start.date} ${req.body.start.time}`))
// const start = {
//   dateTime: startTime.toISOString().split('.')[0],
//   timeZone: req.body.timeZone
// }
// const end = {
//   dateTime: new Date(startTime.setHours(startTime.getHours() + 1)).toISOString().split('.')[0],
//   timeZone: req.body.timeZone
// }
// const attendees = req.body.attendees.split(/,\s*/).map((email) => {
//   return { email }
// })
// const sendUpdates = 'all'
// const requestBody = { description, summary, timeZone, start, end, attendees }
//
// const response = await calendarApi.events.insert({ calendarId, sendUpdates, requestBody })

module.exports = async ({ payload, log }) => {
  if (payload.ref !== 'refs/heads/master') {
    log.warn('Non master pushed. IGNORING')
    return
  }

  const { head_commit } = payload
  const changed_files = [...head_commit.added, ...head_commit.removed, ...head_commit.modified]
  const changed_y2c = changed_files.find((file) => file.split('/').pop() === 'y2c.yml')

  if (changed_y2c.length === 0) {
    log.warn('No y2c files changed. IGNORING')
    return
  }

  const key = datastore.key('Webhook')
  const data = { repo: payload.repository.full_name, created_at: (new Date()).toISOString() }

  await datastore.insert({ key, data })

  log.warn("Changed y2c files: ", changed_y2c)
}


