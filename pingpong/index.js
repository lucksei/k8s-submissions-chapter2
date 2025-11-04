const express = require('express')
const app = express()
require('dotenv').config()

const PORT = process.env.PORT || 3000
let pongCount = 0

app.get('/pingpong', (req, res) => {
  pongCount++
  return res.send(`pong ${pongCount}`)
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})