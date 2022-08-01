import { TypeORMModule } from '.';
import { EnvironmentModule } from '../../environment';
import { LoggingModule } from '../../logging';
import { ModelModule } from '../../models';
import { ConnectionStringModule } from '../connection-string';
import { DatabaseDebugModule } from '../debug-info';
import { DialectModule } from '../dialect';
import { DataSourceFactoryAnnotation } from './typeorm-annotations';

describe('TypeORM Module Test Suite', () => {
    const module = new TypeORMModule();

    beforeAll(() => {
        new EnvironmentModule().configure();
        new ConnectionStringModule().configure();
        new DialectModule().configure();
        new DatabaseDebugModule().configure();
        new ModelModule().configure();
        new LoggingModule().configure();
        module.configure();
    });

    test('Should resolve the data source factory annotation', () => {
        const dataSourceFactory = module.resolve(DataSourceFactoryAnnotation);

        expect(dataSourceFactory).not.toBeNull();
    });
});
