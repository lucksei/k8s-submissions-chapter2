const axios = require('axios');
const fs = require('node:fs');

const LOREM_PICSUM_URL = 'https://picsum.photos/1200/400'

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
    const response = await axios.get(LOREM_PICSUM_URL, {
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

module.exports = {
  getLoremPicsum,
  getPicLastModifiedDate,
}