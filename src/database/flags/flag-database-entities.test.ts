import { Flag } from '../../models/flags/flag';
import { Message } from '../../models/messages/message';
import { FlagDatabaseEntities } from './flag-database-entities';

describe('Flag Database Entities Test Suite', () => {
    const databaseEntities = new FlagDatabaseEntities(Flag);

    test('Should get all entities', () => {
        const expectedEntities = [Flag];

        const actualEntities = databaseEntities.getAll();

        expect(actualEntities).toEqual(expectedEntities);
    });

    test('Should be true when testing that the flag is an entity', () => {
        const result = databaseEntities.hasEntity(Flag);

        expect(result).toBeTruthy();
    });

    test('Should be true when testing that the flag is an entity', () => {
        const result = databaseEntities.hasEntity(Message);

        expect(result).toBeFalsy();
    });
});
