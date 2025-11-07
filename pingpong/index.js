const express = require('express')
// const fs = require('node:fs')

const app = express()
app.use(express.json())
require('dotenv').config()

// const filepath = process.env.FILEPATH || "./data/pingpong.log"

const PORT = process.env.PORT || 3000
let pongCount = 0

app.get('/pingpong', (req, res) => {
  pongCount++
  // NOTE: Removed writing to file for the time being (exercise 2.1)
  // fs.writeFile(filepath, String(pongCount), 'utf8', err => {
  //   if (err) {
  //     console.error(err)
  //   }
  // });
  return res.send(`pong ${pongCount}`);
})

app.get('/pings', (req, res) => {
  return res.send({ pings: pongCount });
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})