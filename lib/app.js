const { homeRouter, googleRouter, githubRouter } = require('routers')
const { pushWebhook } = require('webhooks')

module.exports = app => {
  app.on('push', pushWebhook)

  const router = app.route('/')

  router.use(homeRouter)
  router.use('/github', githubRouter)
  router.use('/google', googleRouter)
}
