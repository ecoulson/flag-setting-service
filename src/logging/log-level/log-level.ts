import { Injectable } from 'noose-injection';
import { Optional } from '../../common/optional/optional';
import { Environment } from '../../environment/environment';
import { SystemEnvironmentAnnotation } from '../../environment/system/system-annotation';
import { EnvironmentVariable } from '../../environment/variable/environment-variable';
import { LogLevelVariableAnnotation } from '../../environment/variable/environment-variable-annotations';
import { LogLevelType } from './log-level-type';

@Injectable()
export class LogLevel {
    constructor(
        @SystemEnvironmentAnnotation.inject()
        private readonly environment: Environment,
        @LogLevelVariableAnnotation.inject()
        private readonly logLevel: EnvironmentVariable
    ) {}

    level(): LogLevelType {
        const level = this.environment.get(this.logLevel);
        if (level.isEmpty()) {
            return LogLevelType.INFO;
        }
        switch (level.get()) {
            case 'fatal':
                return LogLevelType.FATAL;
            case 'error':
                return LogLevelType.ERROR;
            case 'warn':
                return LogLevelType.WARN;
            case 'info':
                return LogLevelType.INFO;
            case 'debug':
                return LogLevelType.DEBUG;
            default:
                return LogLevelType.INFO;
        }
    }

    getDisplayString(level: LogLevelType): Optional<string> {
        switch (level) {
            case LogLevelType.FATAL:
                return Optional.of('fatal');
            case LogLevelType.ERROR:
                return Optional.of('error');
            case LogLevelType.WARN:
                return Optional.of('warn');
            case LogLevelType.INFO:
                return Optional.of('info');
            case LogLevelType.DEBUG:
                return Optional.of('debug');
            default:
                return Optional.empty();
        }
    }
}
