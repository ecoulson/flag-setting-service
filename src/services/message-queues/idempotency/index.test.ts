import { MessageIdempotencyServiceModule } from '.';
import { DatabaseModule } from '../../../database';
import { EnvironmentModule } from '../../../environment';
import { LoggingModule } from '../../../logging';
import { ModelModule } from '../../../models';
import { StorageModule } from '../../../storage';
import IdentifierServiceModule from '../../identifier';
import { MessageIdempotencyServiceAnnotation } from './message-idempotency-service-annotations';
import { StoredMessageIdempotencyService } from './stored-message-idempotency-service';

describe('Message Idempotency Service Module Test Suite', () => {
    const module = new MessageIdempotencyServiceModule();

    beforeAll(() => {
        new StorageModule().configure();
        new DatabaseModule().configure();
        new EnvironmentModule().configure();
        new ModelModule().configure();
        new LoggingModule().configure();
        new IdentifierServiceModule().configure();
        module.configure();
    });

    test('Should resolve the message idempotency service annotation', () => {
        const service = module.resolve(MessageIdempotencyServiceAnnotation);

        expect(service).toBeInstanceOf(StoredMessageIdempotencyService);
    });
});
