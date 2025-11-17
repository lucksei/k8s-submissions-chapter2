const axios = require('axios');
const fs = require('node:fs');
const config = require('./config')
const path = require('path')


const getPicLastModifiedDate = (filepath) => {
  try {
    const stats = fs.statSync(filepath)
    return stats.mtime;
  } catch (err) {
    return undefined
  }
}

const getLoremPicsum = async (filepath) => {
  try {
    const response = await axios.get(config.loremPicsum.url, {
      responseType: 'arraybuffer',
    })

    fs.writeFile(filepath, response.data, err => {
      if (err) {
        throw err
      }
    });
  } catch (err) {
    throw err
  }
}

// Fetch last modified date of image for the first time
let lastPicsumDate = undefined
lastPicsumDate = getPicLastModifiedDate(path.join(config.dataDir, config.loremPicsum.imageName));

const lookupLoremPicsum = async () => {
  if (!lastPicsumDate || lastPicsumDate < new Date(Date.now() - config.hourlyImageRefreshIntervalMs)) {
    console.log(`Fetching new image: ${path.join(config.dataDir, config.loremPicsum.imageName)}`)
    lastPicsumDate = new Date() // Update last modified date in memory
    await getLoremPicsum(path.join(config.dataDir, config.loremPicsum.imageName));
  }
}

module.exports = {
  lookupLoremPicsum,
}