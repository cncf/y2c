
module.exports = async () => {
  process.env.GCLOUD_PROJECT = 'y2c-test'
  process.env.FIRESTORE_EMULATOR_HOST = '0.0.0.0:8081'
  const firestore = require('db')
  const collections = await firestore.listCollections()
  for (const collection of collections) {
    console.log(collection.id)
  }
}
