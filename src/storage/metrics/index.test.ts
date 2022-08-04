import { MetricStorageModule } from '.';
import { DatabaseModule } from '../../database';
import { EnvironmentModule } from '../../environment';
import { LoggingModule } from '../../logging';
import { ModelModule } from '../../models';
import { ElapsedTimeMetricStorageAnnotation } from './metric-storage-annotations';
import { SQLElapsedTimeMetricStorage } from './sql-elapsed-time-metric-storage';

describe('Metric Storage Module Test Suite', () => {
    const module = new MetricStorageModule();

    beforeAll(() => {
        new ModelModule().configure();
        new LoggingModule().configure();
        new EnvironmentModule().configure();
        new DatabaseModule().configure();
        module.configure();
    });

    test('Should resolve the sql elapsed time metric storage annotation', () => {
        const storage = module.resolve(ElapsedTimeMetricStorageAnnotation);

        expect(storage).toBeInstanceOf(SQLElapsedTimeMetricStorage);
    });
});
