import { DatabaseModule } from '.';
import { ConnectionStringModule } from './connection-string';
import { DatabaseDebugModule } from './debug-info';
import { DialectModule } from './dialect';
import { FlagDatabaseModule } from './flags';
import { MessageDatabaseModule } from './messages';
import { MetricDatabaseModule } from './metrics';
import { TypeORMModule } from './typeorm';

describe('Database Module Test Suite', () => {
    const module = new DatabaseModule();

    beforeAll(() => {
        module.configure();
    });

    test('Should register expected modules', () => {
        expect(module.isRegistered(TypeORMModule)).toBeTruthy();
        expect(module.isRegistered(ConnectionStringModule)).toBeTruthy();
        expect(module.isRegistered(DialectModule)).toBeTruthy();
        expect(module.isRegistered(DatabaseDebugModule)).toBeTruthy();
        expect(module.isRegistered(MessageDatabaseModule)).toBeTruthy();
        expect(module.isRegistered(FlagDatabaseModule)).toBeTruthy();
        expect(module.isRegistered(MetricDatabaseModule)).toBeTruthy();
    });
});
