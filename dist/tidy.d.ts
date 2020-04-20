import { Log, State } from './interfaces/tidy';
export declare const Tidy: (startPath: string, up: boolean) => Promise<{
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
}>;
//# sourceMappingURL=tidy.d.ts.map