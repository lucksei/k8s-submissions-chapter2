require('dotenv').config()

module.exports = {
  port: process.env.PORT || 3001,
  databaseUri: process.env.DATABASE_URI || 'postgres://todo:todo@localhost:5432/todo',
}