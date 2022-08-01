import { Flag } from '../../models/flags/flag';
import { Message } from '../../models/messages/message';
import { MessageDatabaseEntities } from './message-database-entities';

describe('Message Database Entities Test Suite', () => {
    const entities = new MessageDatabaseEntities(Message);

    test('Should create the message database entities', () => {
        const models = entities.getAll();

        expect(models).toEqual([Message]);
    });

    test('Should be true that the entities contains the message model', () => {
        const result = entities.hasEntity(Message);

        expect(result).toBeTruthy();
    });

    test('Should be false that the entities contains the message model', () => {
        const result = entities.hasEntity(Flag);

        expect(result).toBeFalsy();
    });
});
