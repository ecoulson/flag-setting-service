import { Injectable } from 'noose-injection';
import { Optional } from '../../common/optional/optional';
import { Environment } from '../../environment/environment';
import { SystemEnvironmentAnnotation } from '../../environment/system/system-annotation';
import { LogLevelType } from '../../logging/log-level/log-level-type';
import { DatabaseDebugOptions } from './database-debug-options';
import { DatabaseDebugInfo } from './database-debug-info';

@Injectable()
export class SystemDatabaseDebugInfo implements DatabaseDebugInfo {
    private static readonly SYNCHRONIZE_KEY = 'SYNCHRONIZE';
    private static readonly DROP_SCHEMA_KEY = 'DROP_SCHEMA';

    constructor(
        @SystemEnvironmentAnnotation.inject()
        private readonly environment: Environment
    ) {}

    get(): DatabaseDebugOptions {
        const logLevel = Optional.of<number>(
            parseInt(
                this.environment
                    .get('LOG_LEVEL')
                    .getOrDefault(LogLevelType.INFO.toString())
            )
        );
        const synchronize = Optional.of<boolean>(
            this.environment
                .get(SystemDatabaseDebugInfo.SYNCHRONIZE_KEY)
                .getOrDefault('false') === 'true'
        );
        const dropSchema = Optional.of<boolean>(
            this.environment
                .get(SystemDatabaseDebugInfo.DROP_SCHEMA_KEY)
                .getOrDefault('false') === 'true'
        );
        return {
            logging:
                logLevel.getOrDefault(LogLevelType.WARN) <= LogLevelType.INFO,
            synchronize: synchronize.getOrDefault(false),
            dropSchema: dropSchema.getOrDefault(false),
        };
    }
}
