import { instance, mock, reset, when } from 'ts-mockito';
import { DataSource, Repository } from 'typeorm';
import { Logger } from '../../logging/logger';
import { Flag } from '../../models/flags/flag';
import { ConnectionString } from '../connection-string/connection-string';
import { DatabaseDebugInfo } from '../debug-info/database-debug-info';
import { Dialect } from '../dialect/dialect';
import { TypeORMDataSourceFactory } from '../typeorm/typeorm-data-source-factory';
import { FlagDatabaseEntities } from './flag-database-entities';
import { TypeORMFlagDataSource } from './typeorm-flag-data-source';

describe('TypeORM Flag Data Source Test Suite', () => {
    const mockedDataSourceFactory = mock<TypeORMDataSourceFactory>();
    const mockedConnectionString = mock<ConnectionString>();
    const mockedDialect = mock<Dialect>();
    const mockedDebugInfo = mock<DatabaseDebugInfo>();
    const mockedDatabaseEntities = mock(FlagDatabaseEntities);
    const mockedLogger = mock<Logger>();
    const mockedDataSource = mock<DataSource>();
    const mockedRepository = mock<Repository<Flag>>();
    when(mockedDataSourceFactory.buildPostgresDatabase()).thenReturn(
        instance(mockedDataSource)
    );
    const dataSource = new TypeORMFlagDataSource(
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

    test('Should get the flag broker', () => {
        when(mockedDataSource.getRepository(Flag)).thenReturn(
            instance(mockedRepository)
        );

        const broker = dataSource.getFlagBroker();

        expect(broker).not.toBeNull();
    });
});
