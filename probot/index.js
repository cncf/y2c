const pushWebhook = require('./webhooks/push')

module.exports = app => {
  app.on('push', pushWebhook)
}
