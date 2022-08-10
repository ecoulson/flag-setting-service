import { MetricDatabaseModule } from '.';
import { EnvironmentModule } from '../../environment';
import { LoggingModule } from '../../logging';
import { ModelModule } from '../../models';
import { ConnectionStringModule } from '../../connections/connection-string';
import { DatabaseDebugModule } from '../debug-info';
import { DialectModule } from '../dialect';
import { TypeORMModule } from '../typeorm';
import {
    MetricConnectionStrategyAnnotation,
    MetricDatabaseEntitiesAnnotation,
    MetricDataSourceAnnotation,
} from './metric-data-source-annotations';
import { MetricDatabaseEntities } from './metric-database-entities';
import { TypeORMMetricDataSource } from './typeorm-metric-data-source';
import { MetricConnectionStrategy } from './metric-connection-strategy';

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

    test('Should resolve the metric connection strategy', () => {
        const dataSource = module.resolve(MetricConnectionStrategyAnnotation);

        expect(dataSource).toBeInstanceOf(MetricConnectionStrategy);
    });
});
