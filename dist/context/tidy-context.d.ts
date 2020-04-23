import { Log, State } from '../interfaces/tidy';
export declare const colorScheme: string[];
export declare const TidyScanLog: (i: string) => {
    remove: (fileInfo: any) => void;
    project: (fileInfo: Log) => void;
    other: (fileInfo: Log) => void;
    filesScanned: (fileInfo: number) => void;
    result: () => void;
    report: () => void;
    err: (fileInfo: any) => void;
    elapsed: (fileInfo: [number, number]) => void;
    info: () => State;
    removed: (fileInfo: number) => void;
};
export declare const Scanned: {
    remove: (fileInfo: any) => void;
    project: (fileInfo: Log) => void;
    other: (fileInfo: Log) => void;
    filesScanned: (fileInfo: number) => void;
    result: () => void;
    report: () => void;
    err: (fileInfo: any) => void;
    elapsed: (fileInfo: [number, number]) => void;
    info: () => State;
    removed: (fileInfo: number) => void;
};
