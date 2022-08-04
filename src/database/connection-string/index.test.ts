import { ConnectionStringModule } from '.';
import { SystemEnvironmentModule } from '../../environment/system';
import { PostgresConnectionStringAnnotation } from './connection-string-annotation';
import { PostgreSQLConnectionString } from './postgresql-connection-string';

describe('Connection String Module Test Suite', () => {
    const module = new ConnectionStringModule();

    beforeAll(() => {
        new SystemEnvironmentModule().configure();
        module.configure();
    });

    test('Should resolve the postgres connection string', () => {
        const connectionString = module.resolve(
            PostgresConnectionStringAnnotation
        );

        expect(connectionString).toBeInstanceOf(PostgreSQLConnectionString);
    });
});
