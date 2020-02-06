const db = require('db')

module.exports = async ({ payload }) => {
  const { installation } = payload
  const { account } = installation

  const installations = db.collection('installations')
  await installations.add({
    installation_id: installation.id,
    account_id: account.id,
    name: account.login,
    created_at: (new Date()).toISOString()
  })
}
