import { instance, mock, reset, when } from 'ts-mockito';
import { Optional } from '../../common/optional/optional';
import { Environment } from '../../environment/environment';
import { EnvironmentVariable } from '../../environment/variable/environment-variable';
import { ConnectionParameters } from './connection-parameters';
import { PostgreSQLConnectionString } from './postgresql-connection-string';

describe('PostgreSQL Connection String', () => {
    const mockedEnvironment = mock<Environment>();
    const connectionString =
        'postgres://username:password@host_name:5432/database_name';
    const databaseURLVariable = new EnvironmentVariable('DATABASE_URL');
    const postgreSQLConnectionString = new PostgreSQLConnectionString(
        instance(mockedEnvironment)
    );

    beforeEach(() => {
        reset(mockedEnvironment);
    });

    test('Should return an empty optional when there is no connection string', () => {
        when(mockedEnvironment.get(databaseURLVariable)).thenReturn(
            Optional.empty()
        );

        const connectionParameters =
            postgreSQLConnectionString.parse(databaseURLVariable);

        expect(connectionParameters.isEmpty()).toBeTruthy();
    });

    test('Should return connection parameters from the connection string', () => {
        when(mockedEnvironment.get(databaseURLVariable)).thenReturn(
            Optional.of(connectionString)
        );

        const connectionParameters =
            postgreSQLConnectionString.parse(databaseURLVariable);

        expect(connectionParameters.get()).toEqual<ConnectionParameters>({
            database: 'database_name',
            host: 'host_name',
            password: 'password',
            port: 5432,
            username: 'username',
        });
    });
});
