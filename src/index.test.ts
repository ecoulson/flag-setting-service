import { ConnectionModule } from './connections';
import { DatabaseModule } from './database';
import { EnvironmentModule } from './environment';
import { EventModule } from './events';
import { IdentifierModule } from './identifiers';
import { LoggingModule } from './logging';
import { MainModule } from '.';
import { MessageQueueModule } from './message-queues';
import { ModelModule } from './models';
import { ServerModule } from './server';
import { ServiceModule } from './services';
import { StorageModule } from './storage';
import { AppAnnotation } from './app-annotations';
import { App } from './app';

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
        expect(module.isRegistered(MessageQueueModule)).toBeTruthy();
        expect(module.isRegistered(EventModule)).toBeTruthy();
        expect(module.isRegistered(IdentifierModule)).toBeTruthy();
        expect(module.isRegistered(ConnectionModule)).toBeTruthy();
    });

    test('Should register the app with the app annotation', () => {
        const app = module.resolve(AppAnnotation);

        expect(app).toBeInstanceOf(App);
    });
});
