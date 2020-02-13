const nock = require('nock')
const App = require('app')
const { Probot } = require('probot')
const fs = require('fs')
const db = require('db')

describe('My Probot app', () => {
  let probot
  let mockCert

  const truncateDb = async () => {
    const collections = await db.listCollections()
    const batch = db.batch()
    for (const collection of collections) {
      const result = await collection.get()
      result.docs.forEach(doc => batch.delete(doc.ref))
    }
    await batch.commit()
  }

  beforeAll((done) => {
    fs.readFile('test/fixtures/mock-cert.pem', (err, cert) => {
      if (err) return done(err)
      mockCert = cert
      done()
    })
  })

  beforeEach(async () => {
    nock.disableNetConnect()
    probot = new Probot({ id: 1, cert: mockCert, githubToken: 'test' })
    probot.load(App)
    await truncateDb()
  })

  const payload = {
    action: 'created',
    installation: {
      id: 12345,
      account: {
        login: 'cncf',
        id: 55555
      }
    }
  }

  test('test we store installation when user installs app on org', async () => {
    await probot.receive({ name: 'installation', payload })
    const installations = db.collection('installations')
    const result = await installations.get()
    expect(result.docs.length).toBe(1)
    const installation = result.docs[0].data()
    expect(installation.name).toBe('cncf')
    expect(installation.installation_id).toBe(12345)
    expect(installation.account_id).toBe(55555)
  })

  afterEach(() => {
    nock.cleanAll()
    nock.enableNetConnect()
  })
})
