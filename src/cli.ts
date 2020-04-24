import inquirer from 'inquirer'
import {TidyServices} from './cli-parts/tidy-services'
import {Services} from './modules/type-definitions'
/**
 *
 *
 * @exports async function to cli
 * @param args array user input
 *
 *
 */
const parseArgumentsIntoOptions = async (args: any) => {
   /**
    * universal unhandled rejection catcher
    * on error console log and exit
    *
    */
   process.on('unhandledRejection', err => {
      console.error("@Tidy: I'm down, this time.... :", err)
      process.exit(1)
   })
   /**
    * @name Tidy
    * @description Let 'em know who's Tidy is
    * @author Darik Hart
    * @license MIT    *
    * @neuralline git
    * @neuralline/tidy npm
    * npx @neuralline/tidy
    *
    * global install
    * npm i -g @neuralline/tidy
    */
   process.stdout.write(`\x1b[32m
    
      Neural Line
      Neat and controlled.
      T.I.D.Y ~/ˈtʌɪdi/
      cli version 0.0.4 - 2020    
     
    \n`)

   /**
    * expects string array || [string]
    * remove duplicates and create unique list
    *
    * The first 2 args has path information.
    * Match user input against list of available services and remove duplicates
    * Return undefined for unrecognised inputs
    * atm it has any type
    */
   const uniqueServices: any = new Set(
      args.slice(2).map((service: string) => Services[service.toLowerCase()])
   )

   /**
    *
    * Remove unrecognised user inputs commands
    * delete undefined from the list
    *
    */
   uniqueServices.delete(undefined)

   /**
    * if args is missing prompt the user with available services
    * inquirer.prompt(questions) with a list of options available atm [scan, clean, help]
    *
    * if user input is missing ask the user what they want to do
    *
    */

   let answers
   if (!uniqueServices.size) {
      answers = await inquirer.prompt({
         type: 'list',
         name: 'tidy',
         message: 'What do you want to do? ',
         choices: ['scan', 'clean', 'help']
      })
      uniqueServices.add(answers.tidy)
   }

   return [...uniqueServices]
}

export const cli = async (args: any) => {
   const options: any = await parseArgumentsIntoOptions(args)
   await TidyServices(options)
   return true
}
