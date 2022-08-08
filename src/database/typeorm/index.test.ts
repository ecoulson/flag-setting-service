import { TypeORMModule } from '.';
import { EnvironmentModule } from '../../environment';
import { LoggingModule } from '../../logging';
import { ModelModule } from '../../models';
import { ConnectionStringModule } from '../../connections/connection-string';
import { DatabaseDebugModule } from '../debug-info';
import { DialectModule } from '../dialect';
import { DataSourceFactoryAnnotation } from './typeorm-annotations';
import { TypeORMDataSourceFactory } from './typeorm-data-source-factory';

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

        expect(dataSourceFactory).toBeInstanceOf(TypeORMDataSourceFactory);
    });
});
