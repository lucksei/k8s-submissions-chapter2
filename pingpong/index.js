const express = require('express')
const fs = require('node:fs')

const app = express()
require('dotenv').config()

const filepath = process.env.FILEPATH || "./data/pingpong.log"

const PORT = process.env.PORT || 3000
let pongCount = 0

app.get('/pingpong', (req, res) => {
  pongCount++
  fs.writeFile(filepath, String(pongCount), 'utf8', err => {
    if (err) {
      console.error(err)
    }
  });
  return res.send(`pong ${pongCount}`);
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})