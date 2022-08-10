import { Injectable } from 'noose-injection';
import { EnvironmentVariable } from '../../environment/variable/environment-variable';
import { MetricDatabaseURLVariableAnnotation } from '../../environment/variable/environment-variable-annotations';
import { Logger } from '../../logging/logger';
import { LoggerAnnotation } from '../../logging/logging-annotations';
import { TypeORMConnectionStrategy } from '../typeorm/typeorm-connection-strategy';
import { MetricDataSource } from './metric-data-source';
import { MetricDataSourceAnnotation } from './metric-data-source-annotations';

@Injectable()
export class MetricConnectionStrategy extends TypeORMConnectionStrategy {
    constructor(
        @MetricDataSourceAnnotation.inject()
        dataSource: MetricDataSource,
        @MetricDatabaseURLVariableAnnotation.inject()
        databaseUrl: EnvironmentVariable,
        @LoggerAnnotation.inject()
        logger: Logger
    ) {
        super(dataSource, databaseUrl, logger);
    }
}
