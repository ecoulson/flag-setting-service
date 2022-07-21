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
import { Logger } from '../../logging/logger';
import { PostgreSQLConnectionString } from '../connection-string/postgresql-connection-string';
import { DatabaseDebugInfo } from '../debug-info/database-debug-info';
import { Dialect } from '../dialect/dialect';
import { DialectType } from '../dialect/dialect-type';
import { DatabaseEntities } from '../entities/database-entities';
import { TypeORMDataSource } from './typeorm-data-source';

describe('TypeORM Data Source Test Suite', () => {
    const mockedConnectionString = mock(PostgreSQLConnectionString);
    const mockedDataSource = mock(DataSource);
    const mockedRepository = mock(Repository);
    const mockedDialect = mock<Dialect>();
    const mockedDebugInfo = mock<DatabaseDebugInfo>();
    const mockedDatabaseEntities = mock<DatabaseEntities>();
    const mockedLogger = mock<Logger>();
    const dataSource = new TypeORMDataSource(
        instance(mockedDataSource),
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
            instance(mockedDataSource)
        );
        when(mockedConnectionString.parse()).thenReturn(
            Optional.of({
                database: 'database',
                host: 'host',
                password: 'password',
                username: 'username',
                port: 5432,
            })
        );

        const result = await dataSource.initialize();

        expect(result).toBeTruthy();
        verify(mockedDataSource.setOptions(anything())).once();
        verify(mockedDataSource.initialize()).once();
        verify(mockedConnectionString.parse()).once();
        verify(mockedDebugInfo.get()).once();
        verify(mockedDialect.type()).once();
        verify(mockedDatabaseEntities.getAll()).once();
    });

    test('Should not initialize the data source when the connection string parse is empty', async () => {
        when(mockedDatabaseEntities.getAll()).thenReturn([]);
        when(mockedDialect.type()).thenReturn(DialectType.POSTGRESQL);
        when(mockedDataSource.setOptions(anything())).thenReturn(
            instance(mockedDataSource)
        );
        when(mockedConnectionString.parse()).thenReturn(Optional.empty());

        const result = await dataSource.initialize();

        expect(result).toBeFalsy();
        verify(mockedConnectionString.parse()).once();
        verify(mockedDataSource.setOptions(anything())).never();
        verify(mockedDataSource.initialize()).never();
        verify(mockedDebugInfo.get()).never();
        verify(mockedDialect.type()).never();
        verify(mockedDatabaseEntities.getAll()).never();
        verify(mockedLogger.error(anyString())).once();
    });

    test('Should not initialize the data source when no dialect is provided', async () => {
        when(mockedDatabaseEntities.getAll()).thenReturn([]);
        when(mockedDialect.type()).thenReturn(DialectType.UNKNOWN);
        when(mockedDataSource.setOptions(anything())).thenReturn(
            instance(mockedDataSource)
        );
        when(mockedConnectionString.parse()).thenReturn(
            Optional.of({
                database: 'database',
                host: 'host',
                password: 'password',
                username: 'username',
                port: 5432,
            })
        );

        const result = await dataSource.initialize();

        expect(result).toBeFalsy();
        verify(mockedConnectionString.parse()).once();
        verify(mockedDataSource.setOptions(anything())).never();
        verify(mockedDataSource.initialize()).never();
        verify(mockedDebugInfo.get()).never();
        verify(mockedDialect.type()).once();
        verify(mockedLogger.error(anyString())).once();
    });

    test('Should not initialize the data source when no dialect is provided', async () => {
        when(mockedDatabaseEntities.getAll()).thenReturn([]);
        when(mockedDialect.type()).thenReturn(DialectType.UNKNOWN);
        when(mockedDataSource.setOptions(anything())).thenReturn(
            instance(mockedDataSource)
        );
        when(mockedConnectionString.parse()).thenReturn(
            Optional.of({
                database: 'database',
                host: 'host',
                password: 'password',
                username: 'username',
                port: 5432,
            })
        );

        const result = await dataSource.initialize();

        expect(result).toBeFalsy();
        verify(mockedConnectionString.parse()).once();
        verify(mockedDataSource.setOptions(anything())).never();
        verify(mockedDataSource.initialize()).never();
        verify(mockedDialect.type()).once();
        verify(mockedDebugInfo.get()).never();
        verify(mockedDatabaseEntities.getAll()).never();
        verify(mockedLogger.error(anyString())).once();
    });

    test('Should get a repository for an entity', () => {
        when(mockedDataSource.getRepository(anything())).thenReturn(
            instance(mockedRepository)
        );

        const repository = dataSource.getRepository(Optional);

        expect(repository).not.toBeNull();
    });
});
