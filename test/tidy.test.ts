import {Tidy} from '../src/tidy-main'

//console.log(Tidy())

test('dummy test', () => {
   const result = 2 * 3
   expect(result).toBe(6)
})

test('TidyScanLog is present', () => {
   const result = Tidy
   expect(result).toBeTruthy()
})

test('Tidy start path should not be empty', () => {
   return Tidy('', false).then(data => expect(data).toBeFalsy())
})

test('Tidy should return false on invalid startPath', () => {
   return Tidy('invalid/path', false).then(data => expect(data).toBeFalsy())
})
