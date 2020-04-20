export const help = () => {
   // If they didn't ask for help, then this is not a "success"
   const log = console.log
   log('\n\n\n')
   log('Usage: Tidy [scan, up, help]')
   log('')
   log(
      '  description: deletes node_modules and cache files from your project directories.'
   )
   log('')
   log('Options:')
   log('')
   log('  -h, --help          Display this usage info')
   log('  scan                Scan all my directories for matching files')
   log('  up                  Tidy up, remove node_modules and cache files')
   log(
      '  uninstall           Same as Tidy up, delete files that matches the list'
   )
   log('  delete              Same as Tidy ups')
   log('  remove              Same as Tidy ups')
   log('  up                  Tidy up, remove all matching files')
   log('  list, -ls           list cache files definitions')
   log('  init, --init        Initialise Tidy. Not implemented')
   log(
      '  ignore              Ignore this directory and sub directories. Not implemented'
   )
   log('\n\n\n')
}
