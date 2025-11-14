require('dotenv').config()

module.exports = {
  port: process.env.PORT || 3000,
  databaseUri: process.env.DATABASE_URI || 'postgres://pingpong:pingpong@localhost:5432/pingpong',
}