require('dotenv').config();
const express = require('express');
const path = require('path');

const { getLoremPicsum, getPicLastModifiedDate } = require('./utils/services');
const config = require('./utils/config');

const staticDir = config.getStaticDir()
const dataDir = config.getDataDir()

// Express app
const app = express()
app.use(express.static(staticDir, { index: false }));
app.use(express.static(dataDir, { index: false }));

// Fetch last modified date of image for the first time
let lastPicsumDate = undefined
lastPicsumDate = getPicLastModifiedDate(path.join(dataDir, "/hourly.jpg"));

app.get('*splat', async (req, res) => {
  // Render the page
  res.sendFile(path.join(staticDir, 'index.html'));

  // NOTE: By sending the image one last time we ensure that fetching the image wont block
  //       the request making the page load faster and a better user experience.
  // Fetch new image and store it in the static dir
  if (!lastPicsumDate || lastPicsumDate < new Date(Date.now() - config.hourlyImageRefreshIntervalMs)) {
    console.log(`Fetching new image: ${path.join(dataDir, "/hourly.jpg")}`)
    lastPicsumDate = new Date() // Update last modified date in memory
    await getLoremPicsum(path.join(dataDir, "/hourly.jpg"));
  }
})

app.listen(config.port, () => {
  console.log(`Todo app listening on port ${config.port}`)
});