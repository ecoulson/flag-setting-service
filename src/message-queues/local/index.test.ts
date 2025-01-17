import { LocalMessageQueueModule } from '.';
import { DatabaseModule } from '../../database';
import { EnvironmentModule } from '../../environment';
import { LoggingModule } from '../../logging';
import { ModelModule } from '../../models';
import { StorageModule } from '../../storage';
import { EventModule } from '../../events';
import { IdentifierModule } from '../../identifiers';
import { MessageQueueIdempotencyModule } from '../idempotency';
import { LocalMessageQueueAnnotation } from './local-message-queue-annotations';
import { LocalMessageQueue } from './local-message-queue';
import { RetryStrategyModule } from '../retry-strategy';
import { NotificationStrategyModule } from '../notification-strategy';
import { ConnectionModule } from '../../connections';

describe('Local Message Queue Module Test Suite', () => {
    const module = new LocalMessageQueueModule();

    beforeAll(() => {
        new StorageModule().configure();
        new EventModule().configure();
        new MessageQueueIdempotencyModule().configure();
        new IdentifierModule().configure();
        new DatabaseModule().configure();
        new ConnectionModule().configure();
        new NotificationStrategyModule().configure();
        new EnvironmentModule().configure();
        new ModelModule().configure();
        new LoggingModule().configure();
        new RetryStrategyModule().configure();
        module.configure();
    });

    test('Should resolve the local message queue service annotation', () => {
        const service = module.resolve(LocalMessageQueueAnnotation);

        expect(service).toBeInstanceOf(LocalMessageQueue);
    });
});
