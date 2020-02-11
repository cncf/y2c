const path = require('path')
const { homeRouter, googleRouter, githubRouter } = require('routers')
const { pushWebhook, installationWebhook } = require('webhooks')

module.exports = app => {
  app.on('push', pushWebhook)
  app.on('installation', installationWebhook)

  const apiRouter = app.route('/api')

  apiRouter.use(homeRouter)
  apiRouter.use('/github', githubRouter)
  apiRouter.use('/google', googleRouter)

  if (process.env.NODE_ENV === 'production') {
    const baseRouter = app.route('/')

    // app.set('trust proxy', true);

    baseRouter.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
    })
  }
}
