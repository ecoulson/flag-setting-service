import { Injectable } from 'noose-injection';
import { EnvironmentVariable } from '../../environment/variable/environment-variable';
import { FlagDatabaseURLVariableAnnotation } from '../../environment/variable/environment-variable-annotations';
import { Logger } from '../../logging/logger';
import { LoggerAnnotation } from '../../logging/logging-annotations';
import { TypeORMConnectionStrategy } from '../typeorm/typeorm-connection-strategy';
import { FlagDataSource } from './flag-data-source';
import { FlagDatabaseAnnotation } from './flag-database-annotations';

@Injectable()
export class FlagConnectionStrategy extends TypeORMConnectionStrategy {
    constructor(
        @FlagDatabaseAnnotation.inject()
        dataSource: FlagDataSource,
        @FlagDatabaseURLVariableAnnotation.inject()
        databaseUrl: EnvironmentVariable,
        @LoggerAnnotation.inject()
        logger: Logger
    ) {
        super(dataSource, databaseUrl, logger);
    }
}
