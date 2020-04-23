import fs from 'fs-extra'
import path from 'path'
import {Scanned} from '../context/tidy-context'
import {TidyEach} from './tidy-each'
import {WatchedFilesList} from './type-definitions'

/**
 *
 *
 * initiate scan
 * @startPath string path to entry point
 * @purpose scan entry point directory
 *
 *
 *  Tidy scan runs on each directory found
 *  gets number of files
 *  calls @TidyEach for each files found in that directory
 *
 */

export const TidyScan = async (startPath: string) => {
   const resolvedPath = path.resolve(startPath)
   const filesTheDirectory = fs.readdirSync(resolvedPath) || []
   if (filesTheDirectory.length) return false
   await Promise.allSettled(
      filesTheDirectory.map(async (fileName: string) => {
         try {
            const nextPath = path.resolve(resolvedPath, fileName)
            await TidyEach(nextPath, WatchedFilesList)
         } catch (err) {
            Scanned.err(err)
         }
      })
   )
   Scanned.filesScanned(filesTheDirectory.length)

   /**
    * optional async for loop for more performance and also backward compatibility
    * 
    * 
    *  
   
   for (let i = 0; i < length; i++) {
        try {
            const fileName = filesTheDirectory[i]
            const nextPath = path.resolve(resolvedPath, fileName)
            await TidyEach(nextPath, WatchedFilesList)
        } catch (err) {
           Scanned.err(err)
        }
    } 
    *
    *
    */
   return true
}
