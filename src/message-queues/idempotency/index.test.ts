import { MessageQueueIdempotencyModule } from '.';
import { DatabaseModule } from '../../database';
import { EnvironmentModule } from '../../environment';
import { LoggingModule } from '../../logging';
import { ModelModule } from '../../models';
import { StorageModule } from '../../storage';
import { IdentifierModule } from '../../identifiers';
import { MessageQueueIdempotencyAnnotation } from './message-queue-idempotency-annotations';
import { LocalMessageQueueIdempotencyService } from './local-message-idempotency-service';
import { ConnectionModule } from '../../connections';

describe('Message Queue Idempotency Module Test Suite', () => {
    const module = new MessageQueueIdempotencyModule();

    beforeAll(() => {
        new ConnectionModule().configure();
        new StorageModule().configure();
        new DatabaseModule().configure();
        new EnvironmentModule().configure();
        new ModelModule().configure();
        new LoggingModule().configure();
        new IdentifierModule().configure();
        module.configure();
    });

    test('Should resolve the message idempotency service annotation', () => {
        const idempotency = module.resolve(MessageQueueIdempotencyAnnotation);

        expect(idempotency).toBeInstanceOf(LocalMessageQueueIdempotencyService);
    });
});
