const Listr = require('listr')
import {Tidy} from './tidy'
import {help} from './help'

export const TidyServices = async (options: [string]) => {
   const userRequest = new Set(options)
   const targetDirectory = process.cwd()
   const chosenTasks = []

   if (userRequest.has('scan')) {
      chosenTasks.push({
         title: 'Scanning directories',
         task: async () => {
            const scanResult = await Tidy(targetDirectory, false)
            scanResult.result()
         },
         skip: () => undefined
      })
   } else if (userRequest.has('up')) {
      chosenTasks.push({
         title: 'Removing files',
         task: async () => {
            const scanResult = await Tidy(targetDirectory, true)
            scanResult.report()
         },
         skip: () => undefined
      })
   } else {
      chosenTasks.push({
         title: 'Help',
         task: async () => {
            process.stdout.write('\n\x1b[32m    Printing help     \x1b[37m')
            help()
         },
         skip: () => undefined
      })
   }

   const tasks = new Listr(chosenTasks)
   await tasks.run()
   process.stdout.write('\n\x1b[32m√ TIDY DONE         \n')
   return true
}
