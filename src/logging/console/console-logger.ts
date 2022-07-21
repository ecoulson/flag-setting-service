import { Injectable } from 'noose-injection';
import { LogLevel } from '../log-level/log-level';
import { LogLevelAnnotation } from '../log-level/log-level-annotations';
import { LogLevelType } from '../log-level/log-level-type';
import { Logger } from '../logger';

@Injectable()
export class ConsoleLogger implements Logger {
    constructor(
        @LogLevelAnnotation.inject()
        private readonly logLevel: LogLevel
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
        console.log(
            `[${this.logLevel.getDisplayString(level).get()}] ${message}`
        );
        return true;
    }
}
