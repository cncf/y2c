const express = require('express')
const datastore = require('datastore')

const router = express.Router()

router.get('/webhooks', async (req, res) => {
  const query = datastore.createQuery('Webhook')
  const response = await datastore.runQuery(query)
  const webhooks = response[0].map(entity => {
    const key = entity[datastore.KEY]
    return { ...entity, key }
  })
  res.send(webhooks.reverse())
})

module.exports = router
