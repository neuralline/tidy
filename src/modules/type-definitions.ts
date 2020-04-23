/**
 * list of watch files and directory names
 */
import {Wanted} from '../interfaces/tidy'
export const WatchedFilesList: Wanted = {
   'package.json': 'isProjectDirectory',
   node_modules: 'isDelete',
   '.cache': 'isDelete',
   '.yarn': 'isDelete',
   '.pnp': 'isDelete',
   '.history': 'isDelete',
   '.vscode': 'extra',
   '.idea': 'extra',
   '.yarn-error.log': 'extra',
   build: 'extra',
   dist: 'extra',
   Windows: 'escape',
   Users: 'escape'
}

export const Initial_state = {
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

export const Services: any = {
   scan: 'scan',
   up: 'up',
   delete: 'up',
   '--yes': 'up',
   remove: 'up',
   uninstall: 'not implemented',
   install: 'not implemented',
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
   about: 'info',
   clean: 'up',
   info: 'info',
   '--': 'help'
}
