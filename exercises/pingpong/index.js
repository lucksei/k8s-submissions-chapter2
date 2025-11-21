const express = require('express')
const config = require('./utils/config')
const sequelize = require('./utils/db')
const { PingPong } = require('./utils/models')

const app = express()
app.use(express.json())

// sequelize.connectToDatabase()

app.get('/', (req, res) => {
  return res.send('Ok!')
})

app.get('/pingpong', async (req, res) => {
  await PingPong.create({});
  const pingpongCount = await PingPong.count({})
  return res.send(`pong ${pingpongCount}`);
})

app.get('/pings', async (req, res) => {
  const pingpongCount = await PingPong.count({})

  console.log("RESULT:", pingpongCount);
  console.log("TYPE:", typeof pingpongCount);

  return res.send({ "pings": pingpongCount });
})

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`)
})