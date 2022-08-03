import { instance, mock, reset, when } from 'ts-mockito';
import { DataSource as TypeORMDataSource, Repository } from 'typeorm';
import { Logger } from '../../logging/logger';
import { Metric } from '../../models/metrics/metric';
import { ConnectionString } from '../connection-string/connection-string';
import { DatabaseDebugInfo } from '../debug-info/database-debug-info';
import { Dialect } from '../dialect/dialect';
import { TypeORMDataSourceFactory } from '../typeorm/typeorm-data-source-factory';
import { MetricDatabaseEntities } from './metric-database-entities';
import { TypeORMMetricDataSource } from './typeorm-metric-data-source';

describe('TypeORM Metric Data Source Test Suite', () => {
    const mockedDataSourceFactory = mock<TypeORMDataSourceFactory>();
    const mockedConnectionString = mock<ConnectionString>();
    const mockedDialect = mock<Dialect>();
    const mockedDebugInfo = mock<DatabaseDebugInfo>();
    const mockedDatabaseEntities = mock(MetricDatabaseEntities);
    const mockedLogger = mock<Logger>();
    const mockedDataSource = mock<TypeORMDataSource>();
    const mockedRepository = mock<Repository<Metric>>();
    when(mockedDataSourceFactory.buildPostgresDatabase()).thenReturn(
        instance(mockedDataSource)
    );
    const dataSource = new TypeORMMetricDataSource(
        instance(mockedDataSourceFactory),
        instance(mockedConnectionString),
        instance(mockedDialect),
        instance(mockedDebugInfo),
        instance(mockedDatabaseEntities),
        instance(mockedLogger)
    );

    beforeEach(() => {
        reset(mockedDataSourceFactory);
        reset(mockedConnectionString);
        reset(mockedDialect);
        reset(mockedDebugInfo);
        reset(mockedDatabaseEntities);
        reset(mockedLogger);
        reset(mockedDataSource);
        reset(mockedRepository);
        when(mockedDataSourceFactory.buildPostgresDatabase()).thenReturn(
            instance(mockedDataSource)
        );
    });

    test('Should resolve metric data source', () => {
        const broker = dataSource.getElapsedTimeMetricBroker();

        expect(broker).not.toBeNull();
    });
});
