import { anything, instance, mock, reset, verify, when } from 'ts-mockito';
import { DataSource, Repository } from 'typeorm';
import { Optional } from '../../common/optional/optional';
import { PostgreSQLConnectionString } from '../connection-string/postgresql-connection-string';
import { Dialect } from '../dialect/dialect';
import { DialectType } from '../dialect/dialect-type';
import { TypeORMDataSource } from './typeorm-data-source';

describe('TypeORM Data Source Test Suite', () => {
    const mockedConnectionString = mock(PostgreSQLConnectionString);
    const mockedDataSource = mock(DataSource);
    const mockedRepository = mock(Repository);
    const mockedDialect = mock<Dialect>();
    const dataSource = new TypeORMDataSource(
        instance(mockedDataSource),
        instance(mockedConnectionString),
        instance(mockedDialect)
    );

    beforeEach(() => {
        reset(mockedDataSource);
        reset(mockedRepository);
        reset(mockedConnectionString);
    });

    test('Should initialize the data source', async () => {
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
    });

    test('Should not initialize the data source when the connection string parse is empty', async () => {
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
    });

    test('Should not initialize the data source when no dialect is provided', async () => {
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
    });

    test('Should get a repository for an entity', () => {
        when(mockedDataSource.getRepository(anything())).thenReturn(
            instance(mockedRepository)
        );

        const repository = dataSource.getRepository(Optional);

        expect(repository).not.toBeNull();
    });
});
