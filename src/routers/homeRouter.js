const express = require('express')
const db = require('db')

const router = express.Router()

router.get('/webhooks', async (req, res) => {
  const response = await db.collection('pushes').get()
  const pushes = response.docs.map(doc => doc.data())
  res.send(pushes)
})

module.exports = router
