import { MetricRecorderServiceModule } from '.';
import { EventServiceModule } from '../../events';
import IdentifierServiceModule from '../../identifier';
import { LocalMessageQueueServiceModule } from '../../message-queues/local';
import { LocalMetricRecorderServiceAnnotation } from './metric-recorder-service-annotations';

describe('Metric Recorder Service Module', () => {
    const module = new MetricRecorderServiceModule();

    beforeAll(() => {
        new EventServiceModule().configure();
        new IdentifierServiceModule().configure();
        new LocalMessageQueueServiceModule().configure();
        module.configure();
    });

    test('Should resolve the local metric service annotation', async () => {
        const service = module.resolve(LocalMetricRecorderServiceAnnotation);

        expect(service).not.toBeNull();
    });
});
