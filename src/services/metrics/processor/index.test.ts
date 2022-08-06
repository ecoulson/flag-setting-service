import { MetricProcessorModule } from '.';
import { MetricServiceModule } from '..';
import { DatabaseModule } from '../../../database';
import { EnvironmentModule } from '../../../environment';
import { LoggingModule } from '../../../logging';
import { ModelModule } from '../../../models';
import { StorageModule } from '../../../storage';
import { LocalMetricProcessor } from './local/local-metric-processor';
import { MetricProcessorAnnotation } from './metric-processor-annotations';

describe('Metric Processor Module Test Suite', () => {
    const module = new MetricProcessorModule();

    beforeAll(() => {
        new StorageModule().configure();
        new DatabaseModule().configure();
        new EnvironmentModule().configure();
        new ModelModule().configure();
        new MetricServiceModule().configure();
        new LoggingModule().configure();
        module.configure();
    });

    test('Should resolve the local metric processor annotation', () => {
        const processor = module.resolve(MetricProcessorAnnotation);

        expect(processor).toBeInstanceOf(LocalMetricProcessor);
    });
});
