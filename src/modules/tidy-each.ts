import fs from 'fs-extra'
import path from 'path'
import {Scanned} from '../context/tidy-context'
import {Wanted} from '../interfaces/tidy'
import {TidyScan} from './tidy-scan'

/**
 * run this function for each files found
 * this examines each files
 * calls logger to pass on specific information
 * returns true on success
 * it doesn't actually rerun false it just escape that file
 * on error logs filename
 *
 */
export const TidyEach = async (startPath: string, WatchedFilesList: Wanted) => {
   const fileName = path.basename(startPath)
   let reason = ''
   try {
      if (WatchedFilesList[fileName] === 'isDelete') {
         reason = fileName
         await Scanned.remove({path: startPath, fileName, reason})
         return
      } else if (WatchedFilesList[fileName] === 'isProjectDirectory') {
         reason = fileName
         await Scanned.project({path: startPath, fileName, reason})
      } else if (WatchedFilesList[fileName]) {
         reason = fileName
         Scanned.other({path: startPath, fileName, reason})
      }
      if (
         fs.lstatSync(startPath).isDirectory() &&
         WatchedFilesList[fileName] !== 'escape'
      ) {
         await TidyScan(startPath)
      }
   } catch (err) {
      Scanned.err(fileName)
   }
   return true
}
