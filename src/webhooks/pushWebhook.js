// const { google } = require('googleapis/build/src/index')
const db = require('db')

// const auth = new google.auth.GoogleAuth({
//   scopes: ['https://www.googleapis.com/auth/calendar']
// })

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

  const headCommit = payload.head_commit
  const changedFiles = [...headCommit.added, ...headCommit.removed, ...headCommit.modified]
  const changedY2c = changedFiles.find((file) => file.split('/').pop() === 'y2c.yml')

  if (changedY2c.length === 0) {
    log.warn('No y2c files changed. IGNORING')
    return
  }

  const pushes = db.collection('pushes')
  const { repository, installation } = payload
  const data = {
    repo: repository.full_name,
    installation_id: installation.id,
    created_at: (new Date()).toISOString()
  }

  await pushes.add(data)

  log.warn('Changed y2c files: ', changedY2c)
}
