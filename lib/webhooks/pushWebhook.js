const { google } = require('googleapis/build/src/index')

const auth = new google.auth.GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/calendar']
});

module.exports = async (context) => {
  const serviceAccountAuthClient = await auth.getClient()
  serviceAccountAuthClient.subject = 'admin@deploydemo.xyz'
  // const { googleTokens } = req.session
  // oauth2Client.setCredentials(googleTokens)
  const calendarApi = google.calendar({ version: 'v3', auth: serviceAccountAuthClient })
  const { calendarId, description, summary, timeZone } = req.body
  const startTime = (new Date(`${req.body.start.date} ${req.body.start.time}`))
  const start = {
    dateTime: startTime.toISOString().split('.')[0],
    timeZone: req.body.timeZone
  }
  const end = {
    dateTime: new Date(startTime.setHours(startTime.getHours() + 1)).toISOString().split('.')[0],
    timeZone: req.body.timeZone
  }
  const attendees = req.body.attendees.split(/,\s*/).map((email) => {
    return { email }
  })
  const sendUpdates = 'all'
  const requestBody = { description, summary, timeZone, start, end, attendees }

  console.log('creating event with params: ', requestBody)

  const response = await calendarApi.events.insert({ calendarId, sendUpdates, requestBody })

  if (response.status === 200) {
    res.redirect('/')
  } else {
    console.log('Google API response: ', response)
    res.send('FAILED')
  }
}


