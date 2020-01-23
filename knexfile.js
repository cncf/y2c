module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || { database: 'y2c_dev' },
  migrations: {
    directory: './lib/migrations'
  }
};
