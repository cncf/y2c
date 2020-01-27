const express = require('express')
const db = require('db')
const clientSettings = require('clientSettings')

const router = express.Router()

router.get('/webhooks', async (req, res) => {
  const webhooks = await db('webhooks').orderBy('created_at', 'desc')
  res.send(webhooks)
})

router.get('/settings', async (req, res) => {
  res.send(clientSettings)
})

module.exports = router
