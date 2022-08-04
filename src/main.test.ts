import { DatabaseModule } from './database';
import { EnvironmentModule } from './environment';
import { LoggingModule } from './logging';
import { MainModule } from './main';
import { ModelModule } from './models';
import { ServerModule } from './server';
import { ServiceModule } from './services';
import { StorageModule } from './storage';

describe('Main Module Test Suite', () => {
    const module = new MainModule();

    beforeAll(() => {
        module.configure();
    });

    test('Should register expected modules', () => {
        expect(module.isRegistered(DatabaseModule)).toBeTruthy();
        expect(module.isRegistered(EnvironmentModule)).toBeTruthy();
        expect(module.isRegistered(LoggingModule)).toBeTruthy();
        expect(module.isRegistered(ModelModule)).toBeTruthy();
        expect(module.isRegistered(ServerModule)).toBeTruthy();
        expect(module.isRegistered(ServiceModule)).toBeTruthy();
        expect(module.isRegistered(StorageModule)).toBeTruthy();
    });
});
