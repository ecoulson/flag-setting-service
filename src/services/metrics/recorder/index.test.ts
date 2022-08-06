import { MetricRecorderModule } from '.';
import { DatabaseModule } from '../../../database';
import { MessageDatabaseModule } from '../../../database/messages';
import { EnvironmentModule } from '../../../environment';
import { LoggingModule } from '../../../logging';
import { ModelModule } from '../../../models';
import { StorageModule } from '../../../storage';
import { MessageIdempotencyStorageModule } from '../../../storage/messages/idempotency';
import { EventModule } from '../../../events';
import IdentifierServiceModule from '../../identifier';
import { MessageQueueIdempotencyModule } from '../../../message-queues/idempotency';
import { LocalMessageQueueModule } from '../../../message-queues/local';
import { LocalMetricRecorder } from './local/local-metric-recorder';
import { LocalMetricRecorderAnnotation } from './metric-recorder-annotations';

describe('Metric Recorder Module', () => {
    const module = new MetricRecorderModule();

    beforeAll(() => {
        new EventModule().configure();
        new IdentifierServiceModule().configure();
        new LocalMessageQueueModule().configure();
        new MessageQueueIdempotencyModule().configure();
        new StorageModule().configure();
        new DatabaseModule().configure();
        new EnvironmentModule().configure();
        new ModelModule().configure();
        new LoggingModule().configure();
        module.configure();
    });

    test('Should resolve the local metric annotation', async () => {
        const service = module.resolve(LocalMetricRecorderAnnotation);

        expect(service).toBeInstanceOf(LocalMetricRecorder);
    });
});
