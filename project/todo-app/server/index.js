require('dotenv').config();
const express = require('express');
const path = require('path');

const { lookupLoremPicsum } = require('./utils/services');
const config = require('./utils/config');

// Express app
const app = express()
app.use(express.static(config.staticDir, { index: false }));
app.use(express.static(config.dataDir, { index: false }));

app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

app.get('/readyz', (req, res) => {
  res.status(200).send('OK');
});

app.get('*splat', async (req, res) => {
  // Render the page
  res.sendFile(path.join(config.staticDir, 'index.html'));

  // NOTE: By sending the image one last time before reloading, we ensure that fetching the image wont block
  //       the request making the page load faster and a better user experience.

  // Fetch new image and store it in the static dir
  await lookupLoremPicsum();
})


app.listen(config.port, () => {
  console.log(`Todo app listening on port ${config.port}`)
});