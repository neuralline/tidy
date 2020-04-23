import fs from 'fs-extra'
import {Scanned, colorScheme} from './context/tidy-context'
import {TidyScan} from './modules/tidy-scan'
import {TidyDelete} from './modules/tidy-delete'

/**
 * @Tidy starts here
 * one way data binding
 * none of them should return data to their parents to avoid call back hell/ or return hell
 * uses @cyre style state management
 * @param startPath string path to target directory
 * @param up boolean if its true will remove detected files
 */
export const Tidy = async (startPath: string, up: boolean) => {
   /**
    * verify input and startPath
    * check if start path is not empty
    * check entry point has a valid file path
    */
   if (!startPath) return false
   if (!fs.existsSync(startPath)) return false
   /**
    * after this point there is no user input no need for type check
    * interlinks of internal functions
    * ?? could invalid file name interrupt
    *
    */
   //logs time
   const start = process.hrtime()
   //prints out progress
   process.stdout.write(
      `\n${colorScheme[6]}[Scanning]${colorScheme[3]} Tidy Scanning files.\n`
   )
   /**
    *
    *
    * initiate scan
    * @startPath string path to entry point
    * @purpose scan entry point directory
    *
    */
   await TidyScan(startPath)
   Scanned.result()
   process.stdout.write(
      `\n${colorScheme[2]}[Scanning]${colorScheme[3]} complete.`
   )
   /**
    *
    * If remove option is enabled
    * call @TidyDelete
    * if up is true
    *
    */
   if (up) {
      process.stdout.write(
         `\n${colorScheme[6]}[Removing]${colorScheme[3]} Tidy Removing files.`
      )
      const {removable} = Scanned.info()
      await TidyDelete(removable)
      process.stdout.write(
         `\n${colorScheme[2]}[Removing]${colorScheme[3]} complete.`
      )
   }
   /**
    * log time end
    * show progress report
    */
   Scanned.elapsed(process.hrtime(start))
   Scanned.report()
   /**
    * exit application
    */
   return true
}
