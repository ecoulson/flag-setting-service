import { Module } from 'noose-injection';
import { ConsoleLoggerModule } from './console';
import { ConsoleLogger } from './console/console-logger';
import LogLevelModule from './log-level';
import { LoggerAnnotation } from './logging-annotations';

export class LoggingModule extends Module {
    configure(): void {
        this.registerClass(LoggerAnnotation, ConsoleLogger);
        this.registerModule(new LogLevelModule());
        this.registerModule(new ConsoleLoggerModule());
    }
}
