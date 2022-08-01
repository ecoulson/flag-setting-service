import { Flag } from '../../models/flags/flag';
import { FlagDatabaseEntities } from './flag-database-entities';

describe('Flag Database Entities Test Suite', () => {
    const databaseEntities = new FlagDatabaseEntities(Flag);

    test('Should get all entities', () => {
        const expectedEntities = [Flag];

        const actualEntities = databaseEntities.getAll();

        expect(actualEntities).toEqual(expectedEntities);
    });
});
