import { DatabaseDebugOptions } from './database-debug-options';

export interface DatabaseDebugInfo {
    get(): DatabaseDebugOptions;
}
