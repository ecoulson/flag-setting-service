import { Flag } from '../../models/flags/flag';
import { Message } from '../../models/messages/message';
import { TypeORMDatabaseEntities } from './typeorm-database-entities';

describe('TypeORM database entities', () => {
    const databaseEntities = new TypeORMDatabaseEntities(Flag, Message);

    test('Should have all the entities in the array', () => {
        const entities = databaseEntities.getAll();

        expect(entities).toEqual([Flag, Message]);
    });
});
