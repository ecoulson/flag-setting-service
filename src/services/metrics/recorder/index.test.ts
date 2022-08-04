import { MetricRecorderModule } from '.';
import { DatabaseModule } from '../../../database';
import { MessageDatabaseModule } from '../../../database/messages';
import { EnvironmentModule } from '../../../environment';
import { LoggingModule } from '../../../logging';
import { ModelModule } from '../../../models';
import { StorageModule } from '../../../storage';
import { MessageIdempotencyStorageModule } from '../../../storage/messages/idempotency';
import { EventServiceModule } from '../../events';
import IdentifierServiceModule from '../../identifier';
import { MessageIdempotencyServiceModule } from '../../message-queues/idempotency';
import { LocalMessageQueueServiceModule } from '../../message-queues/local';
import { LocalMetricRecorderAnnotation } from './metric-recorder-annotations';

describe('Metric Recorder Module', () => {
    const module = new MetricRecorderModule();

    beforeAll(() => {
        new EventServiceModule().configure();
        new IdentifierServiceModule().configure();
        new LocalMessageQueueServiceModule().configure();
        new MessageIdempotencyServiceModule().configure();
        new StorageModule().configure();
        new DatabaseModule().configure();
        new EnvironmentModule().configure();
        new ModelModule().configure();
        new LoggingModule().configure();
        module.configure();
    });

    test('Should resolve the local metric annotation', async () => {
        const service = module.resolve(LocalMetricRecorderAnnotation);

        expect(service).not.toBeNull();
    });
});
