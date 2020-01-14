const path = require('path')
const { Probot } = require('probot')
const cookieSession = require('cookie-session')
const express = require('express')
const { homeRouter, googleRouter, githubRouter } = require('./routers')
const { pushWebhook } = require('./webhooks')

const App = async (app) => {
  app.on('push', pushWebhook)

  const router = app.route('/')

  router.use(cookieSession({
    name: 'y2c',
    secret: 'change-me',
    maxAge: 30 * 4 * 60 * 60 * 1000
  }))

  router.use(express.urlencoded({ extended: true }))

  router.use(homeRouter)
  router.use('/github', githubRouter)
  router.use('/google', googleRouter)
}

Probot.run(App).then(({ server }) => server.set('views', path.resolve('lib/views')))
