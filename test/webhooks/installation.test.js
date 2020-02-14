const db = require('db')
const describeWebhook = require('../support/describeWebhook')

describeWebhook('Installation Webhook', ({ probot }) => {
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
})
