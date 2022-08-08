import { FlagStorageModule } from '.';
import { ConnectionModule } from '../../connections';
import { DatabaseModule } from '../../database';
import { EnvironmentModule } from '../../environment';
import { LoggingModule } from '../../logging';
import { ModelModule } from '../../models';
import { FlagStorageAnnotation } from './flag-storage-annotations';
import { SQLFlagStorage } from './sql-flag-storage';

describe('Flag Module Test Suite', () => {
    const module = new FlagStorageModule();

    beforeAll(() => {
        new EnvironmentModule().configure();
        new DatabaseModule().configure();
        new ModelModule().configure();
        new LoggingModule().configure();
        new ConnectionModule().configure();
        module.configure();
    });

    test('Should resolve the flag storage', () => {
        const storage = module.resolve(FlagStorageAnnotation);

        expect(storage).toBeInstanceOf(SQLFlagStorage);
    });
});
