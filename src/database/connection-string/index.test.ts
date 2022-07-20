import { ConnectionStringModule } from '.';
import { SystemEnvironmentModule } from '../../environment/system';
import {
    DatabaseURLAnnotation,
    PostgresConnectionStringAnnotation,
} from './connection-string-annotation';

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

        expect(connectionString).not.toBeNull();
    });

    test('Should resolve the database url class', () => {
        const databaseURL = module.resolve(DatabaseURLAnnotation);

        expect(databaseURL).not.toBeNull();
    });
});
