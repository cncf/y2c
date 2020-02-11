const db = require('db')

module.exports = async ({ payload, log }) => {
  const { installation, action } = payload
  const { account } = installation

  const installations = db.collection('installations')

  log(`${account.login} ${action} installation`)

  if (action === 'created') {
    await installations.add({
      installation_id: installation.id,
      account_id: account.id,
      name: account.login,
      created_at: (new Date()).toISOString()
    })
  } else if (action === 'deleted') {
    const result = await installations.where('installation_id', '==', installation.id).get()
    await result.docs.forEach(doc => doc.ref.delete())
  }
}
