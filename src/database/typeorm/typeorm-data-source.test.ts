import {
    anyString,
    anything,
    instance,
    mock,
    reset,
    verify,
    when,
} from 'ts-mockito';
import { DataSource, Repository } from 'typeorm';
import { Optional } from '../../common/optional/optional';
import { EnvironmentVariable } from '../../environment/variable/environment-variable';
import { Logger } from '../../logging/logger';
import { PostgreSQLConnectionString } from '../connection-string/postgresql-connection-string';
import { DatabaseDebugInfo } from '../debug-info/database-debug-info';
import { Dialect } from '../dialect/dialect';
import { DialectType } from '../dialect/dialect-type';
import { DatabaseEntities } from '../entities/database-entities';
import { DataSourceFactory } from './data-source-factory';
import { TypeORMDataSource } from './typeorm-data-source';

describe('TypeORM Data Source Test Suite', () => {
    const databaseURL = new EnvironmentVariable('DATABASE_URL');
    const mockedConnectionString = mock(PostgreSQLConnectionString);
    const mockedDataSourceFactory = mock(DataSourceFactory);
    const mockedDataSource = mock(DataSource);
    const mockedRepository = mock(Repository);
    const mockedDialect = mock<Dialect>();
    const mockedDebugInfo = mock<DatabaseDebugInfo>();
    const mockedDatabaseEntities = mock<DatabaseEntities>();
    const mockedLogger = mock<Logger>();
    const postgreSQLDataSource = instance(mockedDataSource);
    when(mockedDataSourceFactory.buildPostgresDatabase()).thenReturn(
        postgreSQLDataSource
    );
    const dataSource = new TypeORMDataSource(
        instance(mockedDataSourceFactory),
        instance(mockedConnectionString),
        instance(mockedDialect),
        instance(mockedDebugInfo),
        instance(mockedDatabaseEntities),
        instance(mockedLogger)
    );

    beforeEach(() => {
        reset(mockedDataSource);
        reset(mockedRepository);
        reset(mockedConnectionString);
        reset(mockedDebugInfo);
        reset(mockedDialect);
        reset(mockedDatabaseEntities);
        reset(mockedLogger);
    });

    test('Should initialize the data source', async () => {
        when(mockedDatabaseEntities.getAll()).thenReturn([]);
        when(mockedDialect.type()).thenReturn(DialectType.POSTGRESQL);
        when(mockedDataSource.setOptions(anything())).thenReturn(
            postgreSQLDataSource
        );
        when(mockedConnectionString.parse(databaseURL)).thenReturn(
            Optional.of({
                database: 'database',
                host: 'host',
                password: 'password',
                username: 'username',
                port: 5432,
            })
        );

        const result = await dataSource.initialize(databaseURL);

        expect(result).toBeTruthy();
        verify(mockedDataSource.setOptions(anything())).once();
        verify(mockedDataSource.initialize()).once();
        verify(mockedConnectionString.parse(databaseURL)).once();
        verify(mockedDebugInfo.get()).once();
        verify(mockedDialect.type()).once();
        verify(mockedDatabaseEntities.getAll()).once();
    });

    test('Should not initialize the data source when the connection string parse is empty', async () => {
        when(mockedConnectionString.parse(databaseURL)).thenReturn(
            Optional.empty()
        );

        const result = await dataSource.initialize(databaseURL);

        expect(result).toBeFalsy();
        verify(mockedConnectionString.parse(databaseURL)).once();
        verify(mockedDataSource.setOptions(anything())).never();
        verify(mockedDataSource.initialize()).never();
        verify(mockedDebugInfo.get()).never();
        verify(mockedDialect.type()).once();
        verify(mockedDatabaseEntities.getAll()).never();
        verify(mockedLogger.error(anyString())).once();
    });

    test('Should not initialize the data source when no dialect is provided', async () => {
        when(mockedDialect.type()).thenReturn(DialectType.UNKNOWN);
        when(mockedConnectionString.parse(databaseURL)).thenReturn(
            Optional.of({
                database: 'database',
                host: 'host',
                password: 'password',
                username: 'username',
                port: 5432,
            })
        );

        const result = await dataSource.initialize(databaseURL);

        expect(result).toBeFalsy();
        verify(mockedConnectionString.parse(databaseURL)).once();
        verify(mockedDataSource.setOptions(anything())).never();
        verify(mockedDataSource.initialize()).never();
        verify(mockedDebugInfo.get()).never();
        verify(mockedDialect.type()).once();
        verify(mockedLogger.error(anyString())).once();
    });

    test('Should not initialize the data source when no dialect is provided', async () => {
        when(mockedDialect.type()).thenReturn(DialectType.UNKNOWN);
        when(mockedConnectionString.parse(databaseURL)).thenReturn(
            Optional.of({
                database: 'database',
                host: 'host',
                password: 'password',
                username: 'username',
                port: 5432,
            })
        );

        const result = await dataSource.initialize(databaseURL);

        expect(result).toBeFalsy();
        verify(mockedConnectionString.parse(databaseURL)).once();
        verify(mockedDataSource.setOptions(anything())).never();
        verify(mockedDataSource.initialize()).never();
        verify(mockedDialect.type()).once();
        verify(mockedDebugInfo.get()).never();
        verify(mockedDatabaseEntities.getAll()).never();
        verify(mockedLogger.error(anyString())).once();
    });

    test('Should not initialize the data source when initialization throws an error.', async () => {
        when(mockedDatabaseEntities.getAll()).thenReturn([]);
        when(mockedDataSource.setOptions(anything())).thenReturn(
            postgreSQLDataSource
        );
        when(mockedDialect.type()).thenReturn(DialectType.POSTGRESQL);
        when(mockedDataSource.initialize()).thenThrow(new Error());
        when(mockedConnectionString.parse(databaseURL)).thenReturn(
            Optional.of({
                database: 'database',
                host: 'host',
                password: 'password',
                username: 'username',
                port: 5432,
            })
        );

        const result = await dataSource.initialize(databaseURL);

        expect(result).toBeFalsy();
        verify(mockedConnectionString.parse(databaseURL)).once();
        verify(mockedDataSource.setOptions(anything())).once();
        verify(mockedDataSource.initialize()).once();
        verify(mockedDialect.type()).once();
        verify(mockedDebugInfo.get()).once();
        verify(mockedDatabaseEntities.getAll()).once();
        verify(mockedLogger.error(anyString())).twice();
    });

    test('Should get a repository for an entity', async () => {
        when(mockedDataSource.getRepository(anything())).thenReturn(
            instance(mockedRepository)
        );

        const repository = dataSource.getRepository(DataSource);

        expect(repository).not.toBeNull();
    });
});
