const nock = require('nock')
const db = require('db')
const describeApi = require('../../support/describeApi')

describeApi('Github API', ({ server }) => {
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

  test('Only returns installations belonging to the user', async () => {
    const collection = db.collection('installations')
    await collection.add({ installation_id: 12345 })

    nock('https://api.github.com')
      .get('/user/installations')
      .reply(200, {
        installations: [
          { id: 12345 },
          { id: 55555 }
        ]
      })

    const response = await server.get('/api/github/installations')
    const installations = response.body
    expect(installations.length).toBe(1)
    expect(installations[0].installation_id).toBe(12345)
  })
})
