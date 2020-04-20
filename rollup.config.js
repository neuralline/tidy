import commonjs from '@rollup/plugin-commonjs'
import {terser as minify} from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import tsCompile from 'typescript'
import pkg from './package.json'

const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'test'

const input = pkg.input
const external = ['tslib']
export default [
   {
      input,
      external,
      output: {name: 'Tidy', file: pkg.minified, format: 'cjs'},
      plugins: [
         typescript({typescript: tsCompile, target: 'ESNext'}),
         commonjs(),
         minify({
            mangle: {
               toplevel: true
            },
            compress: {
               toplevel: true,
               global_defs: {
                  '@process.env.NODE_ENV': JSON.stringify('production')
               }
            }
         })
      ]
   } /* ,
   {
      input,
      external,
      output: {name: 'cli', file: pkg.cjs, format: 'cjs'},
      plugins: [
         typescript({typescript: tsCompile, target: 'ESNext'}),
         commonjs()
      ]
   } */
]
