require('dotenv').config();
const express = require('express');
const path = require('path');

const { getLoremPicsum, getPicLastModifiedDate } = require('./services');

const PORT = process.env.PORT || 3000
const DIST_DIR = process.env.DIST_DIR || "../frontend/dist"
const HOURLY_IMAGE_REFRESH_INTERVAL_MS = 10 * 60 * 1000 // 10 minutes

// Dirs
const STATIC_DIR = path.join(__dirname, DIST_DIR)
console.log(`Static dir: ${STATIC_DIR}`)

const app = express()
app.use(express.static(STATIC_DIR, { index: false }));

// Fetch last modified date of image for the first time
let lastPicsumDate = undefined
lastPicsumDate = getPicLastModifiedDate(path.join(STATIC_DIR, "/public/static/hourly.jpg"));

app.get('*splat', async (req, res) => {
  // Render the page
  res.sendFile(path.join(__dirname, DIST_DIR, 'index.html'));

  // NOTE: By sending the image one last time we ensure that fetching the image wont block
  //       the request making the page load faster and a better user experience.
  // Fetch new image and store it in the static dir
  if (!lastPicsumDate || lastPicsumDate < new Date(Date.now() - HOURLY_IMAGE_REFRESH_INTERVAL_MS)) {
    console.log(`Fetching new image: ${path.join(STATIC_DIR, "/public/static/hourly.jpg")}`)
    lastPicsumDate = new Date() // Update last modified date in memory
    await getLoremPicsum(path.join(STATIC_DIR, "/public/static/hourly.jpg"));
  }
})

app.listen(PORT, () => {
  console.log(`Todo app listening on port ${PORT}`)
});