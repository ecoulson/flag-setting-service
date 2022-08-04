import { StorageModule } from '.';
import { FlagStorageModule } from './flags';
import { MessageStorageModule } from './messages';
import { MetricStorageModule } from './metrics';

describe('Storage Module Test Suite', () => {
    const module = new StorageModule();

    beforeAll(() => {
        module.configure();
    });

    test('Should register expected modules', () => {
        expect(module.isRegistered(FlagStorageModule)).toBeTruthy();
        expect(module.isRegistered(MessageStorageModule)).toBeTruthy();
        expect(module.isRegistered(MetricStorageModule)).toBeTruthy();
    });
});
