import {TidyScanLog, Scanned} from '../src/context/tidy-context'

//constrictor string
const i = '@neuralline/tidy'

test('dummy test', () => {
   const result = 2 * 3
   expect(result).toBe(6)
})

test('TidyScanLog should return a function', () => {
   const result = TidyScanLog
   expect(result).toBeTruthy()
})

test('TidyScanLog should return a function', () => {
   const result = TidyScanLog()
   expect(result).toBeTruthy()
})

test('TidyScanLog.remove should return undefined', () => {
   const result = TidyScanLog(i).remove()
   expect(result).toBeUndefined()
})

test('TidyScanLog.filesScanned should return undefined', () => {
   const result = TidyScanLog(i).filesScanned(8)
   expect(result).toBeUndefined()
})

test('TidyScanLog.filesScanned should return undefined', () => {
   const result = TidyScanLog(i).filesScanned(8)
   expect(result).toBeUndefined()
})

test('TidyScanLog.filesScanned should return undefined', () => {
   const result = TidyScanLog(i).filesScanned(8)
   expect(result).toBeUndefined()
})

test('Scanned should be exported', () => {
   const result = Scanned
   expect(result).toBeTruthy()
})

test('Scanned should return object', () => {
   const result = Scanned
   expect(result).toBeInstanceOf(Object)
})
