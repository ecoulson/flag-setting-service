import { ElapsedTimeMetric } from '../../models/metrics/elasped-time-metric';
import { MetricDatabaseEntities } from './metric-database-entities';

describe('Metric Database Entities Test Suite', () => {
    const metricDatabaseEntities = new MetricDatabaseEntities(
        ElapsedTimeMetric
    );

    test('Should get all entities', () => {
        const expectedEntities = [ElapsedTimeMetric];

        const actualEntities = metricDatabaseEntities.getAll();

        expect(actualEntities).toEqual(expectedEntities);
    });
});
