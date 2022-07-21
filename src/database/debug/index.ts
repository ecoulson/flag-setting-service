import { Module } from 'noose-injection';
import { DatabaseDebugAnnotation } from './debug-annotation';
import { SystemDebugInfo } from './system-debug-info';

export class DatabaseDebugModule extends Module {
    configure(): void {
        this.registerClass(DatabaseDebugAnnotation, SystemDebugInfo);
    }
}
