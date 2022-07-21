import { DatabaseDebugOptions } from './database-debug-options';

export interface DebugInfo {
    get(): DatabaseDebugOptions;
}
