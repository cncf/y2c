const db = require('db')

module.exports = () => {
  beforeEach(async () => {
    const collections = await db.listCollections()
    const batch = db.batch()
    for (const collection of collections) {
      const result = await collection.get()
      for (const doc of result.docs) {
        batch.delete(doc.ref)
      }
    }
    await batch.commit()
  })
}
