const db = require('db')
const describeWebhook = require('../support/describeWebhook')

describeWebhook('Uninstall Webhook', ({ probot }) => {
  const payload = {
    action: 'deleted',
    installation: {
      id: 12345,
      account: {
        login: 'cncf'
      }
    }
  }

  test('Installation is removed from DB', async () => {
    const collection = db.collection('installations')
    await collection.add({ installation_id: 12345 })
    let result = await collection.get()
    expect(result.docs.length).toBe(1)

    await probot.receive({ name: 'installation', payload })
    result = await collection.get()
    expect(result.docs.length).toBe(0)
  })
})
