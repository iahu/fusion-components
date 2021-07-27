/**
 * Utility for cleaning directories.
 * Usage: node build/clean.js %path%
 */
import { resolve } from 'path'
import rimraf from 'rimraf'
import * as argv from 'yargs'

/**
 * All paths passed to the clean script
 */
const paths = argv._

/**
 * Function to remove a given path
 */
function cleanPath(cleanPath) {
  const removePath = resolve(process.cwd(), cleanPath)
  rimraf(removePath, () => {
    console.log(removePath, 'cleaned')
  })
}

/**
 * Clean all paths
 */
if (Array.isArray(paths)) {
  paths.forEach(cleanPath)
}
