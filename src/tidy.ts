/**
 * TIDY
 * quietly remove node_modules and .cache directories
 */

const fs = require('fs-extra')
const path = require('path')
import {matchAgainst} from './type-definitions'
import {Log, State, Wanted} from './interfaces/tidy'

function TidyScanLog(i: string) {
   const colorScheme = [
      '\x1b[35m',
      '\x1b[31m',
      '\x1b[32m',
      '\x1b[36m',
      '\x1b[33m',
      '\x1b[37m'
   ]
   process.stdout.write(`\n\x1b[3m Initializing tidy state  \x1b[37m ${i}`)
   const state: any = {
      removable: [],
      removed: 0,
      projects: [],
      others: [],
      files: 0,
      elapsed: [0, 0],
      errors: []
   }
   const remove = (fileInfo: any) => {
      state.removable = [...state.removable, fileInfo]
      process.stdout.write('\x1b[91m:')
   }
   const project = (fileInfo: Log): void => {
      process.stdout.write('\x1b[32m:')
      state.projects = [...state.projects, fileInfo]
   }
   const other = (fileInfo: Log): void => {
      process.stdout.write('\x1b[37m:')
      state.others = [...state.others, fileInfo]
   }
   const filesScanned = (fileInfo: number): void => {
      state.files = state.files + fileInfo
   }
   const removed = (fileInfo: number): void => {
      state.removed = state.removed + fileInfo
   }
   const elapsed = (fileInfo: [number, number]): void => {
      state.elapsed = fileInfo
   }
   const err = (fileInfo: any) => {
      state.errors = [...state.errors, fileInfo]
      process.stdout.write(`${colorScheme[1]}   can not access   ${fileInfo}`)
   }
   const info = (): State => {
      return {...state}
   }
   const result = () => {
      report()
      process.stdout.write(`${colorScheme[0]}          
                             TIDY :
                     Scan results :    
                                  :     `)
      if (state.removable.length) {
         state.removable.map((file: {path: string; fileName: string}) => {
            process.stdout.write(
               `\n${colorScheme[1]}[ > ] ${colorScheme[0]}${file.fileName} : ${colorScheme[3]} ${file.path}`
            )
         })
         process.stdout.write(
            `\n\n${colorScheme[4]}[INFO]${colorScheme[5]} run 'tidy up' to remove these files.`
         )
      } else {
         process.stdout.write(
            `\n${colorScheme[2]}[CLEAN]${colorScheme[3]} No removable file found.`
         )
      }
      process.stdout.write(`${colorScheme[0]}         
                                  :
                          the end :    
                                  :
      \n`)
   }
   const report = () => {
      const removable = state.removable.length || 0
      const projectDir = state.projects.length || 0
      const others = state.others.length || 0
      const files = state.files || 0
      const removed = state.removed || 0
      const errors = state.errors.length || 0
      const elapsedT = `${state.elapsed[0]}s and ${
         state.elapsed[1] / 1000000
      }ms`

      process.stdout.write(`${colorScheme[0]} 
                      TIDY REPORT :
                                  :
                    files scanned : ${files}
            removable files found : ${removable} 
                          removed : ${removed} 
                   projects found : ${projectDir} 
                           others : ${others} 
                           errors : ${errors} 
                          elapsed : ${elapsedT} 
         
      \n`)
   }
   return {
      remove,
      project,
      other,
      filesScanned,
      result,
      report,
      err,
      elapsed,
      info,
      removed
   }
}

const Scanned = TidyScanLog('npx @neuralline/tidy')

/**
 * TIDY DELETE
 * removes given file or directory including subdirectories recursively
 */
const TidyDelete = async (removable: []) => {
   try {
      await Promise.allSettled(
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

const TidyForEach = async (startPath: string, matchAgainst: Wanted) => {
   const fileName = path.basename(startPath)
   let reason = ''
   try {
      if (matchAgainst[fileName] === 'isDelete') {
         reason = fileName
         await Scanned.remove({path: startPath, fileName, reason})
         return
      } else if (matchAgainst[fileName] === 'isProjectDirectory') {
         reason = fileName
         await Scanned.project({path: startPath, fileName, reason})
      } else if (matchAgainst[fileName]) {
         reason = fileName
         Scanned.other({path: startPath, fileName, reason})
      }
      if (fs.lstatSync(startPath).isDirectory()) {
         await TidyScan(startPath)
      }
   } catch (err) {
      Scanned.err(err)
   }
   return true
}

const TidyScan = async (startPath: string) => {
   const resolvedPath = path.resolve(startPath)
   const filesTheDirectory = fs.readdirSync(resolvedPath) || []
   //const length = filesTheDirectory.length
   await Promise.all(
      filesTheDirectory.map(async (fileName: string) => {
         try {
            const nextPath = path.resolve(resolvedPath, fileName)
            await TidyForEach(nextPath, matchAgainst)
         } catch (err) {
            Scanned.err(err)
         }
      })
   )
   Scanned.filesScanned(filesTheDirectory.length)

   /* for (let i = 0; i < length; i++) {
        try {
            const fileName = filesTheDirectory[i]
            const nextPath = path.resolve(resolvedPath, fileName)
            await TidyForEach(nextPath, matchAgainst)
        } catch (err) {
           Scanned.err(err)
        }
    } */
   return true
}

export const Tidy = async (startPath: string, up: boolean) => {
   const start = process.hrtime()
   await TidyScan(startPath)

   if (up) {
      const {removable} = Scanned.info()
      await TidyDelete(removable)
   }
   const end = process.hrtime(start)
   await Scanned.elapsed(end)
   return Scanned
}
