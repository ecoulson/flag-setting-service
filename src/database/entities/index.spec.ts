import { DatabaseEntitiesModule } from '.';
import { ModelModule } from '../../models';
import { DatabaseEntitiesAnnotation } from './entities-annotations';

describe('Database Entities Module Test Suite', () => {
    const module = new DatabaseEntitiesModule();

    beforeAll(() => {
        new ModelModule().configure();
        module.configure();
    });

    test('Should resolve the database entities annotation', () => {
        const entities = module.resolve(DatabaseEntitiesAnnotation);

        expect(entities).not.toBeNull();
    });
});
