import { Injectable } from 'noose-injection';
import { LogLevel } from '../log-level/log-level';
import { LogLevelAnnotation } from '../log-level/log-level-annotations';
import { LogLevelType } from '../log-level/log-level-type';
import { Logger } from '../logger';
import { ChalkAnnotation } from './console-logger-annotations';
import { Chalk } from 'chalk';
import {
    TimestampFormatterAnnotation,
    TimestampGeneratorAnnotation,
} from '../timestamp/timestamp-annotations';
import { TimestampGenerator } from '../timestamp/timestamp-generator';
import { TimestampFormatter } from '../timestamp/timestamp-formatter';

@Injectable()
export class ConsoleLogger implements Logger {
    constructor(
        @LogLevelAnnotation.inject()
        private readonly logLevel: LogLevel,
        @ChalkAnnotation.inject()
        private readonly chalk: Chalk,
        @TimestampGeneratorAnnotation.inject()
        private readonly timestampGenerator: TimestampGenerator,
        @TimestampFormatterAnnotation.inject()
        private readonly timestampFormatter: TimestampFormatter
    ) {}

    fatal(message: string): Promise<boolean> {
        return this.log(LogLevelType.FATAL, message);
    }

    error(message: string): Promise<boolean> {
        return this.log(LogLevelType.ERROR, message);
    }

    warn(message: string): Promise<boolean> {
        return this.log(LogLevelType.WARN, message);
    }

    info(message: string): Promise<boolean> {
        return this.log(LogLevelType.INFO, message);
    }

    debug(message: string): Promise<boolean> {
        return this.log(LogLevelType.DEBUG, message);
    }

    private async log(level: LogLevelType, message: string): Promise<boolean> {
        if (level < this.logLevel.level()) {
            return false;
        }
        console.log(this.getFormattedLogMessage(level, message));
        return true;
    }

    private getFormattedLogMessage(level: LogLevelType, message: string) {
        return `${this.getFormattedLogLevel(
            level
        )} ${this.getTimestamp()} ${message}`;
    }

    private getFormattedLogLevel(level: LogLevelType): string {
        return (
            this.chalk.blue(this.chalk.bold('[')) +
            this.chalk.bold(this.colorLogLevelDisplayString(level)) +
            this.chalk.blue(this.chalk.bold(']'))
        );
    }

    private colorLogLevelDisplayString(level: LogLevelType): string {
        const displayString = this.logLevel.getDisplayString(level);
        switch (level) {
            case LogLevelType.FATAL:
                return this.chalk.black(displayString.get());
            case LogLevelType.ERROR:
                return this.chalk.red(displayString.get());
            case LogLevelType.WARN:
                return this.chalk.yellow(displayString.get());
            case LogLevelType.INFO:
                return this.chalk.white(displayString.get());
            case LogLevelType.DEBUG:
                return this.chalk.green(displayString.get());
            default:
                return displayString.get();
        }
    }

    private getTimestamp(): string {
        const datetime = this.timestampGenerator.generateCurrentTimestamp();
        const formattedTimestamp = this.timestampFormatter.format(datetime);
        return this.chalk.underline(formattedTimestamp);
    }
}
