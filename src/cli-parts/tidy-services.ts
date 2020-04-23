import {Tidy} from '../tidy-main'
import {help} from './help'

export const TidyServices = async (options: [string]) => {
   const userRequest = new Set(options)
   const targetDirectory = process.cwd()
   //const chosenTasks = []

   if (userRequest.has('scan')) {
      await Tidy(targetDirectory, false)
   } else if (userRequest.has('up') || userRequest.has('clean')) {
      await Tidy(targetDirectory, true)
   } else {
      process.stdout.write('\n\x1b[32m    Printing help     \x1b[37m')
      help()
   }

   // const tasks = new Listr(chosenTasks)
   // await tasks.run()
   process.stdout.write('\n\x1b[32m√ TIDY DONE         \n')
   return true
}
