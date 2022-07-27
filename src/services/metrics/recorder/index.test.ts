import { MetricRecorderServiceModule } from '.';
import { MessageQueueServiceModule } from '../../message-queues';
import { LocalMetricRecorderServiceAnnotation } from './metric-recorder-service-annotations';

describe('Metric Recorder Service Module', () => {
    const module = new MetricRecorderServiceModule();

    beforeAll(() => {
        new MessageQueueServiceModule().configure();
        module.configure();
    });

    test('Should resolve the local metric service annotation', async () => {
        const service = module.resolve(LocalMetricRecorderServiceAnnotation);

        expect(service).not.toBeNull();
    });
});
