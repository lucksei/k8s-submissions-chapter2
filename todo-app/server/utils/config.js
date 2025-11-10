require('dotenv').config()
const fs = require('node:fs')
const path = require('path')

// Static dir for frontend stuff
const getStaticDir = () => {
  const staticDir = path.resolve(process.env.STATIC_DIR || "../frontend/dist");
  if (!fs.existsSync(staticDir)) {
    throw new Error(`Static dir does not exist: ${staticDir}`)
  }
  console.log(`Static dir: ${staticDir}`)
  return staticDir
}

// Data dir for K8s 'Persistent Volume Claim'
const getDataDir = () => {
  const dataDir = path.resolve(process.env.DATA_DIR || "../data");
  if (!fs.existsSync(dataDir)) {
    throw new Error(`Data dir does not exist: ${dataDir}`)
  }
  console.log(`Data dir: ${dataDir}`)
  return dataDir
}

const hourlyImageRefreshIntervalMs = process.env.HOURLY_IMAGE_REFRESH_INTERVAL_SECONDS * 1000 || 10 * 60 * 1000;

const port = process.env.PORT || 3000

module.exports = {
  getStaticDir,
  getDataDir,
  hourlyImageRefreshIntervalMs,
  port,
}