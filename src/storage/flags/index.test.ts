import { FlagStorageModule } from '.';
import { DatabaseModule } from '../../database';
import { DatabaseEntitiesModule } from '../../database/entities';
import { EnvironmentModule } from '../../environment';
import { LoggingModule } from '../../logging';
import { ModelModule } from '../../models';
import { FlagStorageAnnotation } from './flag-storage-annotations';

describe('Flag Module Test Suite', () => {
    const module = new FlagStorageModule();

    beforeAll(() => {
        new EnvironmentModule().configure();
        new DatabaseModule().configure();
        new DatabaseEntitiesModule().configure();
        new ModelModule().configure();
        new LoggingModule().configure();
        module.configure();
    });

    test('Should resolve the flag storage', () => {
        const storage = module.resolve(FlagStorageAnnotation);

        expect(storage).not.toBeNull();
    });
});
