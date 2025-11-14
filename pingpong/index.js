const express = require('express')
const config = require('./utils/config')
const sequelize = require('./utils/db')
const { PingPong } = require('./utils/models')

const app = express()
app.use(express.json())

sequelize.connectToDatabase()

app.get('/pingpong', async (req, res) => {
  await PingPong.create({});
  const pingpongCount = await PingPong.count({})
  return res.send(`pong ${pingpongCount}`);
})

app.get('/pings', (req, res) => {
  const pingpongCount = PingPong.count({})
  return res.send({ pings: pingpongCount });
})

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`)
})