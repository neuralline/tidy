export const colorScheme = ['[35m', '[31m', '[32m', '[36m', '[33m', '[37m', '[34m']

const isExist = fileName => {
   if (fs.existsSync(fileName)) {
      return true
   }
   return false
}
