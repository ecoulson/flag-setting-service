import { Module } from 'noose-injection';
import { DatabaseDebugInfoAnnotation } from './debug-annotation';
import { SystemDatabaseDebugInfo } from './system-database-debug-info';

export class DatabaseDebugModule extends Module {
    configure(): void {
        this.registerClass(
            DatabaseDebugInfoAnnotation,
            SystemDatabaseDebugInfo
        );
    }
}
