import { MetricDatabaseModule } from '.';
import { EnvironmentModule } from '../../environment';
import { LoggingModule } from '../../logging';
import { ModelModule } from '../../models';
import { ConnectionStringModule } from '../connection-string';
import { DatabaseDebugModule } from '../debug-info';
import { DialectModule } from '../dialect';
import { TypeORMModule } from '../typeorm';
import { MetricDataSourceAnnotation } from './metric-data-source-annotations';
import { MetricDatabaseEntitiesAnnotation } from './metric-database-annotations';
import { MetricDatabaseEntities } from './metric-database-entities';
import { TypeORMMetricDataSource } from './typeorm-metric-data-source';

describe('Metric Database Module Test Suite', () => {
    const module = new MetricDatabaseModule();

    beforeAll(() => {
        new DialectModule().configure();
        new DatabaseDebugModule().configure();
        new ModelModule().configure();
        new EnvironmentModule().configure();
        new TypeORMModule().configure();
        new LoggingModule().configure();
        new ConnectionStringModule().configure();
        module.configure();
    });

    test('Should resolve the metric data source entities', () => {
        const entities = module.resolve(MetricDatabaseEntitiesAnnotation);

        expect(entities).toBeInstanceOf(MetricDatabaseEntities);
    });

    test('Should resolve the metric data source annotation', () => {
        const dataSource = module.resolve(MetricDataSourceAnnotation);

        expect(dataSource).toBeInstanceOf(TypeORMMetricDataSource);
    });
});
