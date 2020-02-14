const supertest = require('supertest')
const App = require('app')
const { Probot } = require('probot')
const disableNetConnect = require('./disableNetConnect')
const truncateDb = require('./truncateDb')

module.exports = (title, callback) => {
  let probot = new Probot({ id: 1, cert: 'mock-cert', githubToken: 'test' })
  probot.load(App)

  describe(title, () => {
    disableNetConnect()
    truncateDb()

    callback({ server: supertest(probot.server) })
  })
}
