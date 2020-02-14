const nock = require('nock')

module.exports = () => {
  beforeEach(() => {
    nock.disableNetConnect()
    nock.enableNetConnect('127.0.0.1')
  })

  afterEach(() => {
    nock.cleanAll()
    nock.enableNetConnect()
  })
}
