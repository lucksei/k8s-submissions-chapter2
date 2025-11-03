require('dotenv').config();
const express = require('express');
const app = express()

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send(`Server started in port ${PORT}`);
})

app.listen(PORT, () => {
  console.log(`Todo app listening on port ${PORT}`)
});