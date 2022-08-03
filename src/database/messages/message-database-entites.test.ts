import { Flag } from '../../models/flags/flag';
import { Message } from '../../models/messages/message';
import { MessageIdempotencyMapping } from '../../models/messages/message-idempotency-mapping';
import { MessageDatabaseEntities } from './message-database-entities';

describe('Message Database Entities Test Suite', () => {
    const entities = new MessageDatabaseEntities(
        Message,
        MessageIdempotencyMapping
    );

    test('Should create the message database entities', () => {
        const models = entities.getAll();

        expect(models).toEqual([Message, MessageIdempotencyMapping]);
    });
});
