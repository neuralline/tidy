const inquirer = require('inquirer')
import {TidyServices} from './services'

const parseArgumentsIntoOptions = async (rawArgs: any) => {
   process.on('unhandledRejection', err => {
      console.error("@Tidy: I'm down, this time.... :", err)
      process.exit(1)
   })
   process.stdout.write(`\x1b[32m
    
    Neural Line
    Neat and controlled.
    T.I.D.Y ~/ˈtʌɪdi/
    cli version 0.0.1 - 2020    
     
    \n`)

   const services: any = {
      scan: 'scan',
      up: 'up',
      delete: 'up',
      '--yes': 'up',
      remove: 'up',
      uninstall: 'up',
      help: 'help',
      '-h': 'help',
      init: 'init',
      '--init': 'init',
      i: 'init',
      ignore: 'ignore',
      list: 'list',
      ls: 'list',
      yes: 'up',
      cache: 'up',
      save: 'save',
      '-s': 'save',
      log: 'save',
      '--': 'help'
   }

   const uniqueServices = new Set(
      rawArgs.slice(2).map((service: string) => services[service])
   )

   uniqueServices.delete(undefined)
   const questions = []
   if (!uniqueServices.has('up')) {
      questions.push({
         type: 'list',
         name: 'tidy',
         message: 'What do you want to do? ',
         choices: ['up', 'scan', 'help']
      })
   }

   let answers
   if (!uniqueServices.size) {
      answers = await inquirer.prompt(questions)
      uniqueServices.add(answers.tidy)
   }

   return [...uniqueServices]
}

export const cli = async (args: any) => {
   const options: any = await parseArgumentsIntoOptions(args)
   await TidyServices(options)
   return true
}
