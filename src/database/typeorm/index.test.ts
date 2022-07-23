import { TypeORMModule } from '.';
import { EnvironmentModule } from '../../environment';
import { LoggingModule } from '../../logging';
import { ModelModule } from '../../models';
import { ConnectionStringModule } from '../connection-string';
import { DatabaseDebugModule } from '../debug-info';
import { DialectModule } from '../dialect';
import { DatabaseEntitiesModule } from '../entities';
import {
    TypeORMDataSourceAnnotation,
    PostgreSQLDataSourceAnnotation,
} from './typeorm-annotations';

describe('TypeORM Module Test Suite', () => {
    const module = new TypeORMModule();

    beforeAll(() => {
        new EnvironmentModule().configure();
        new ConnectionStringModule().configure();
        new DialectModule().configure();
        new DatabaseDebugModule().configure();
        new DatabaseEntitiesModule().configure();
        new ModelModule().configure();
        new LoggingModule().configure();
        module.configure();
    });

    test('Should resolve the TypeORM data source factory annotation', () => {
        const dataSourceFactory = module.resolve(
            PostgreSQLDataSourceAnnotation
        );

        expect(dataSourceFactory).not.toBeNull();
    });

    test('Should resolve a data source annotation', () => {
        const dataSource = module.resolve(TypeORMDataSourceAnnotation);

        expect(dataSource).not.toBeNull();
    });
});
