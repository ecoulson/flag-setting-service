import { MessageStorageModule } from '.';
import { DatabaseModule } from '../../database';
import { EnvironmentModule } from '../../environment';
import { LoggingModule } from '../../logging';
import { ModelModule } from '../../models';
import { DroppedMessageStorageModule } from './dropped-messages';
import { MessageIdempotencyStorageModule } from './idempotency';
import { MessageStorageAnnotation } from './message-storage-annotations';
import { SQLMessageStorage } from './sql-message-storage';

describe('Message Storage Module Test Suite', () => {
    const module = new MessageStorageModule();

    beforeAll(() => {
        new ModelModule().configure();
        new LoggingModule().configure();
        new EnvironmentModule().configure();
        new DatabaseModule().configure();
        module.configure();
    });

    test('Should resolve sql message storage annotation', () => {
        const storage = module.resolve(MessageStorageAnnotation);

        expect(storage).toBeInstanceOf(SQLMessageStorage);
    });

    test('Should register expected modules', () => {
        expect(
            module.isRegistered(MessageIdempotencyStorageModule)
        ).toBeTruthy();
        expect(module.isRegistered(DroppedMessageStorageModule)).toBeTruthy();
    });
});
