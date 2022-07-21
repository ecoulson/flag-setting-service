import { Injectable } from 'noose-injection';
import { Optional } from '../../common/optional/optional';
import { Environment } from '../../environment/environment';
import { SystemEnvironmentAnnotation } from '../../environment/system/system-annotation';
import { LogLevel } from '../../logging/log-level';
import { DatabaseDebugOptions } from './database-debug-options';
import { DatabaseDebugInfo } from './database-debug-info';

@Injectable()
export class SystemDatabaseDebugInfo implements DatabaseDebugInfo {
    constructor(
        @SystemEnvironmentAnnotation.inject()
        private readonly environment: Environment
    ) {}

    get(): DatabaseDebugOptions {
        const logLevel = Optional.of<number>(
            parseInt(
                this.environment
                    .get('LOG_LEVEL')
                    .getOrDefault(LogLevel.INFO.toString())
            )
        );
        const synchronize = Optional.of<boolean>(
            this.environment.get('SYNCHRONIZE').getOrDefault('false') === 'true'
        );
        const dropSchema = Optional.of<boolean>(
            this.environment.get('DROP_SCHEMA').getOrDefault('false') === 'true'
        );
        return {
            logging: logLevel.getOrDefault(LogLevel.WARN) < 3,
            synchronize: synchronize.getOrDefault(false),
            dropSchema: dropSchema.getOrDefault(false),
        };
    }
}
