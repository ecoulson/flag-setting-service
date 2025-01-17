import { Module } from 'noose-injection';
import { LogLevel } from './log-level';
import { LogLevelAnnotation } from './log-level-annotations';

export class LogLevelModule extends Module {
    configure(): void {
        this.registerClass(LogLevelAnnotation, LogLevel);
    }
}
