import { Injectable } from 'noose-injection';
import { Optional } from '../../common/optional/optional';
import { Logger } from '../../logging/logger';
import { LoggerAnnotation } from '../../logging/logging-annotations';
import { ElapsedTimeMetric } from '../../models/metrics/elasped-time-metric';
import { Broker } from '../broker/broker';
import { ConnectionString } from '../connection-string/connection-string';
import { PostgresConnectionStringAnnotation } from '../connection-string/connection-string-annotation';
import { DatabaseDebugInfo } from '../debug-info/database-debug-info';
import { DatabaseDebugInfoAnnotation } from '../debug-info/debug-annotation';
import { Dialect } from '../dialect/dialect';
import { DialectAnnotation } from '../dialect/dialect-annotations';
import { DataSourceFactoryAnnotation } from '../typeorm/typeorm-annotations';
import { TypeORMDataSource } from '../typeorm/typeorm-data-source';
import { TypeORMDataSourceFactory } from '../typeorm/typeorm-data-source-factory';
import { MetricDataSource } from './metric-data-source';
import { MetricDatabaseEntitiesAnnotation } from './metric-database-annotations';
import { MetricDatabaseEntities } from './metric-database-entities';

@Injectable()
export class TypeORMMetricDataSource
    extends TypeORMDataSource
    implements MetricDataSource
{
    constructor(
        @DataSourceFactoryAnnotation.inject()
        dataSourceFactory: TypeORMDataSourceFactory,
        @PostgresConnectionStringAnnotation.inject()
        connectionString: ConnectionString,
        @DialectAnnotation.inject()
        dialect: Dialect,
        @DatabaseDebugInfoAnnotation.inject()
        debugInfo: DatabaseDebugInfo,
        @MetricDatabaseEntitiesAnnotation.inject()
        entities: MetricDatabaseEntities,
        @LoggerAnnotation.inject()
        logger: Logger
    ) {
        super(
            dataSourceFactory,
            connectionString,
            dialect,
            debugInfo,
            entities,
            logger
        );
    }

    getElapsedTimeMetricBroker(): Optional<Broker<ElapsedTimeMetric>> {
        return this.getBroker(ElapsedTimeMetric);
    }
}
