import { FlagStorageModule } from '.';
import { DatabaseModule } from '../../database';
import { FlagStorageAnnotation } from './flag-broker-annotation';

describe('Flag Module Test Suite', () => {
    const module = new FlagStorageModule();

    beforeAll(() => {
        new DatabaseModule().configure();
        module.configure();
    });

    test('Should resolve the flag storage', () => {
        const storage = module.resolve(FlagStorageAnnotation);

        expect(storage).not.toBeNull();
    });
});
