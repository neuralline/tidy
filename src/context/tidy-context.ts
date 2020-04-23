import {Log, State} from '../interfaces/tidy'
export const colorScheme = ['[35m', '[31m', '[32m', '[36m', '[33m', '[37m', '[34m']

export const TidyScanLog = (i: string) => {
   process.stdout.write(
      `\n${colorScheme[6]}[Initializing]${colorScheme[3]} ${i}\n`
   )

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
      process.stdout.write('\x1b[31m:')
   }
   const project = (fileInfo: Log): void => {
      process.stdout.write('\x1b[32m:')
      state.projects = [...state.projects, fileInfo]
   }
   const other = (fileInfo: Log): void => {
      process.stdout.write('\x1b[34m:')
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
      process.stdout.write(`${colorScheme[1]} can not access ${fileInfo}, `)
   }
   const info = (): State => {
      return {...state}
   }
   const result = () => {
      if (state.removable.length) {
         process.stdout.write(`${colorScheme[0]}          
                                     :
                        Scan results :    
                                     :     `)
         state.removable.map((file: {path: string; fileName: string}) => {
            process.stdout.write(
               `\n${colorScheme[1]}[ > ] ${colorScheme[0]}${file.fileName} : ${colorScheme[3]} ${file.path}`
            )
         })
         process.stdout.write(
            `\n\n${colorScheme[4]}[Found]${colorScheme[5]} run 'tidy up' to remove these files.`
         )
      } else {
         process.stdout.write(
            `\n${colorScheme[2]}[Clean]${colorScheme[3]} No removable file found.`
         )
      }
      process.stdout.write(`${colorScheme[0]} 


                    files scanned : ${state.files} 
            removable files found : ${state.removable.length} 
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
                                  

                                  :
                    end of report :    
                                  
         
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

export const Scanned = TidyScanLog('npx @neuralline/tidy')
