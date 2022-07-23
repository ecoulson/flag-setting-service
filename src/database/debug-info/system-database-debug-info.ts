import { Injectable } from 'noose-injection';
import { Optional } from '../../common/optional/optional';
import { Environment } from '../../environment/environment';
import { SystemEnvironmentAnnotation } from '../../environment/system/system-annotation';
import { LogLevelType } from '../../logging/log-level/log-level-type';
import { DatabaseDebugOptions } from './database-debug-options';
import { DatabaseDebugInfo } from './database-debug-info';
import {
    DropSchemaVariableAnnotation,
    LogLevelVariableAnnotation,
    SynchronizeVariableAnnotation,
} from '../../environment/variable/environment-variable-annotations';
import { EnvironmentVariable } from '../../environment/variable/environment-variable';

@Injectable()
export class SystemDatabaseDebugInfo implements DatabaseDebugInfo {
    constructor(
        @SystemEnvironmentAnnotation.inject()
        private readonly environment: Environment,
        @LogLevelVariableAnnotation.inject()
        private readonly logLevel: EnvironmentVariable,
        @DropSchemaVariableAnnotation.inject()
        private readonly dropSchema: EnvironmentVariable,
        @SynchronizeVariableAnnotation.inject()
        private readonly synchronize: EnvironmentVariable
    ) {}

    get(): DatabaseDebugOptions {
        const logLevel = Optional.of<number>(
            parseInt(
                this.environment
                    .get(this.logLevel)
                    .getOrDefault(LogLevelType.INFO.toString())
            )
        );
        const synchronize = Optional.of<boolean>(
            this.environment.get(this.synchronize).getOrDefault('false') ===
                'true'
        );
        const dropSchema = Optional.of<boolean>(
            this.environment.get(this.dropSchema).getOrDefault('false') ===
                'true'
        );
        return {
            logging:
                logLevel.getOrDefault(LogLevelType.WARN) <= LogLevelType.INFO,
            synchronize: synchronize.getOrDefault(false),
            dropSchema: dropSchema.getOrDefault(false),
        };
    }
}
