export interface Stats {
   [key: string]: any
   fileName: string
   depth: number
   files: number
   isDelete: boolean
   reason: string
   isProjectDirectory: boolean
   directories: number
   removableFiles: number
   subDirectories: any
}

export interface Wanted {
   [key: string]: string
}

export interface Log {
   path: string
   fileName: string
   reason?: string
}

export interface State {
   removable: []
   projects: []
   others: []
   files: number
   elapsed: [number, number]
   errors: []
}
