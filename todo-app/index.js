require('dotenv').config();
const express = require('express');

const { getLoremPicsum, getPicLastModifiedDate } = require('./services');

const PORT = process.env.PORT || 3000
const PUBLIC_DIR = process.env.PUBLIC_DIR || "./public"
const HOURLY_IMAGE_REFRESH_INTERVAL_MS = 10 * 60 * 1000 // 10 minutes

const app = express()
app.use(express.static(PUBLIC_DIR))

// Fetch last modified date of image for the first time
let lastPicsumDate = undefined
try {
  lastPicsumDate = getPicLastModifiedDate(`${PUBLIC_DIR}/hourly.jpg`);
} catch (err) {
  console.error(err)
}

app.get('/', async (req, res) => {
  // Render the page
  res.sendFile(__dirname + '/index.html');

  // NOTE: By sending the image one last time we ensure that fetching the image wont block
  //       the request making the page load faster and a better user experience.
  // Fetch new image and store it in the static dir
  if (!lastPicsumDate || lastPicsumDate < new Date(Date.now() - HOURLY_IMAGE_REFRESH_INTERVAL_MS)) {
    console.log(`Fetching new image: ${PUBLIC_DIR}/hourly.jpg`)
    lastPicsumDate = new Date() // Update last modified date in memory
    await getLoremPicsum(`${PUBLIC_DIR}/hourly.jpg`)
  }
})

app.listen(PORT, () => {
  console.log(`Todo app listening on port ${PORT}`)
});