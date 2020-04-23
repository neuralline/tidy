/**
 * TIDY
 * quietly remove node_modules and .cache directories
 */

import fs from 'fs-extra'
import {Scanned} from '../context/tidy-context'
import {Log} from '../interfaces/tidy'

/**
 * TIDY DELETE
 * removes given file or directory including subdirectories recursively
 */
export const TidyDelete = async (removable: []) => {
   try {
      await Promise.all(
         removable.map(async (file: Log) => {
            await fs.remove(file.path)
            await Scanned.removed(1)
         })
      )
   } catch (err) {
      process.stdout.write('\x1b[31m        unsuccessful     :\n \x1b[37m')
      Scanned.err(err)
      return false
   }

   return true
}
