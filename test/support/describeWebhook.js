const App = require('app')
const { Probot } = require('probot')
const fs = require('fs')
const disableNetConnect = require('./disableNetConnect')
const truncateDb = require('./truncateDb')

module.exports = (title, callback) => {
  const mockCert = fs.readFileSync('test/fixtures/mock-cert.pem')
  let probot = new Probot({ id: 1, cert: mockCert, githubToken: 'test' })
  probot.load(App)

  describe(title, () => {
    disableNetConnect()
    truncateDb()

    callback({ probot })
  })
}
