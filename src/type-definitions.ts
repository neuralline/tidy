/**
 * list of watch files and directory names
 */
import {Wanted} from './interfaces/tidy'
export const matchAgainst: Wanted = {
   'package.json': 'isProjectDirectory',
   node_modules: 'isDelete',
   '.cache': 'isDelete',
   '.yarn': 'isDelete',
   '.pnp': 'isDelete',
   '.history': 'isDelete',
   '.vscode': 'extra',
   '.idea': 'extra',
   '.yarn-error.log': 'extra',
   '.pnp.js': 'extra',
   build: 'extra',
   dist: 'extra'
}

export const initial_stats = {
   fileName: '',
   depth: 0,
   files: 0,
   isDelete: false,
   reason: '',
   isProjectDirectory: false,
   directories: 0,
   removableFiles: 0,
   node_modules: 0,
   'package.json': 0,
   '.cache': 0,
   subDirectories: []
}
