const nock = require('nock')
const App = require('app')
const { Probot } = require('probot')
const fs = require('fs')
const db = require('db')

module.exports = (title, callback) => {
  const mockCert = fs.readFileSync('test/fixtures/mock-cert.pem')
  let probot = new Probot({ id: 1, cert: mockCert, githubToken: 'test' })
  probot.load(App)

  describe(title, () => {
    beforeEach(() => {
      nock.disableNetConnect()
    })

    afterEach(() => {
      nock.cleanAll()
      nock.enableNetConnect()
    })

    beforeEach(async () => {
      const collections = await db.listCollections()
      const batch = db.batch()
      for (const collection of collections) {
        const result = await collection.get()
        result.docs.forEach(doc => batch.delete(doc.ref))
      }
      await batch.commit()
    })

    callback({ probot })
  })
}
