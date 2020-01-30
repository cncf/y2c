const { serverless } = require('@probot/serverless-gcf')
const appFn = require('./index')
module.exports.webhook = serverless(appFn)
