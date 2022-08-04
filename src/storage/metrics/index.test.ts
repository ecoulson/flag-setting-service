import { MetricStorageModule } from '.';
import { DatabaseModule } from '../../database';
import { EnvironmentModule } from '../../environment';
import { LoggingModule } from '../../logging';
import { ModelModule } from '../../models';
import { MetricStorageAnnotation } from './metric-storage-annotations';
import { SQLMetricStorage } from './sql-metric-storage';

describe('Metric Storage Module Test Suite', () => {
    const module = new MetricStorageModule();

    beforeAll(() => {
        new ModelModule().configure();
        new LoggingModule().configure();
        new EnvironmentModule().configure();
        new DatabaseModule().configure();
        module.configure();
    });

    test('Should resolve the sql metric storage', () => {
        const storage = module.resolve(MetricStorageAnnotation);

        expect(storage).toBeInstanceOf(SQLMetricStorage)
    });
});
