import { Message } from '../../models/messages/message';
import { MessageDatabaseEntities } from './message-database-entities';

describe('Message Database Entities Test Suite', () => {
    const entities = new MessageDatabaseEntities(Message);

    test('Should create the message database entities', () => {
        const models = entities.getAll();

        expect(models).toEqual([Message]);
    });
});
