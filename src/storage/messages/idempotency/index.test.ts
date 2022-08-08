import { MessageIdempotencyStorageModule } from '.';
import { ConnectionModule } from '../../../connections';
import { DatabaseModule } from '../../../database';
import { EnvironmentModule } from '../../../environment';
import { LoggingModule } from '../../../logging';
import { ModelModule } from '../../../models';
import { MessageIdempotencyStorageAnnotation } from './message-idempotency-storage-annotations';
import { SQLMessageIdempotencyStorage } from './sql-message-idempotency-storage';

describe('Message Idempotency Storage Module Test Suite', () => {
    const module = new MessageIdempotencyStorageModule();

    beforeAll(() => {
        new ModelModule().configure();
        new LoggingModule().configure();
        new EnvironmentModule().configure();
        new ConnectionModule().configure();
        new DatabaseModule().configure();
        module.configure();
    });

    test('Should resolve the message idempotency storage annotation', () => {
        const storage = module.resolve(MessageIdempotencyStorageAnnotation);

        expect(storage).toBeInstanceOf(SQLMessageIdempotencyStorage);
    });
});
