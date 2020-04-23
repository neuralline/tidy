//import {TidyScanLog, Scanned} from '../src/context/tidy-context'
import {TidyScan} from '../src/modules/tidy-scan'

//constrictor string
const i = '@neuralline/tidy'

test('dummy test should pass', () => {
   const result = 2 * 3
   expect(result).toBe(6)
})

test('TidyScan should be exported', () => {
   const result = TidyScan
   expect(result).toBeTruthy()
})

/* test('TidyScan should execute', () => {
   const result = TidyScan()
   expect(result).toBeTruthy()
}) */

test('TidyScan Promise should reject. ', () => {
   TidyScan().catch(data => {
      expect(data).toBeFalsy()
   })
})
