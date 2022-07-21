import { instance, mock, reset, when } from 'ts-mockito';
import { Optional } from '../../common/optional/optional';
import { ConnectionParameters } from './connection-parameters';
import { DatabaseURL } from './database-url';
import { PostgreSQLConnectionString } from './postgresql-connection-string';

describe('PostgreSQL Connection String', () => {
    const mockedDatabaseURL = mock(DatabaseURL);
    const connectionString =
        'postgres://username:password@host_name:5432/database_name';

    beforeEach(() => {
        reset(mockedDatabaseURL);
    });

    test('Should return an empty optional when there is no connection string', () => {
        const postgreSQLConnectionString = new PostgreSQLConnectionString(
            instance(mockedDatabaseURL)
        );
        when(mockedDatabaseURL.value()).thenReturn(Optional.empty());

        const connectionParameters = postgreSQLConnectionString.parse();

        expect(connectionParameters.isEmpty()).toBeTruthy();
    });

    test('Should return connection parameters from the connection string', () => {
        const postgreSQLConnectionString = new PostgreSQLConnectionString(
            instance(mockedDatabaseURL)
        );
        when(mockedDatabaseURL.value()).thenReturn(
            Optional.of(connectionString)
        );

        const connectionParameters = postgreSQLConnectionString.parse();

        expect(connectionParameters.get()).toEqual<ConnectionParameters>({
            database: 'database_name',
            host: 'host_name',
            password: 'password',
            port: 5432,
            username: 'username',
        });
    });
});
