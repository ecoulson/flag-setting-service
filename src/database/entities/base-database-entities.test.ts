import { BaseDatabaseEntities } from './base-database-entities';

class Test {}

class TestDatabaseEntities extends BaseDatabaseEntities {
    constructor() {
        super(Test);
    }
}

describe('Base Database Entities', () => {
    const databaseEntites = new TestDatabaseEntities();

    test('Should get all database entities', () => {
        const expectedEntities = [Test];

        const actualEntities = databaseEntites.getAll();

        expect(actualEntities).toEqual(expectedEntities);
    });

    test('Should have the test entity', () => {
        const result = databaseEntites.hasEntity(Test);

        expect(result).toBeTruthy();
    });

    test('Should not have the database entities as an entity', () => {
        const result = databaseEntites.hasEntity(TestDatabaseEntities);

        expect(result).toBeFalsy();
    });
});
