import { Module } from 'noose-injection';
import { ConsoleLoggerModule } from './console';
import { ConsoleLogger } from './console/console-logger';
import { LogLevelModule } from './log-level';
import { LoggerAnnotation } from './logging-annotations';
import { TimestampModule } from './timestamp';

export class LoggingModule extends Module {
    configure(): void {
        this.registerModule(new LogLevelModule());
        this.registerModule(new ConsoleLoggerModule());
        this.registerModule(new TimestampModule());
        this.registerClass(LoggerAnnotation, ConsoleLogger);
    }
}
