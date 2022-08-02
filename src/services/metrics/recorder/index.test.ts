import { MetricRecorderModule } from '.';
import { EventServiceModule } from '../../events';
import IdentifierServiceModule from '../../identifier';
import { LocalMessageQueueServiceModule } from '../../message-queues/local';
import { LocalMetricRecorderAnnotation } from './metric-recorder-annotations';

describe('Metric Recorder Module', () => {
    const module = new MetricRecorderModule();

    beforeAll(() => {
        new EventServiceModule().configure();
        new IdentifierServiceModule().configure();
        new LocalMessageQueueServiceModule().configure();
        module.configure();
    });

    test('Should resolve the local metric annotation', async () => {
        const service = module.resolve(LocalMetricRecorderAnnotation);

        expect(service).not.toBeNull();
    });
});
