import { ConnectionModule } from '.';
import { ConnectionStringModule } from './connection-string';

describe('Connection Module Test Suite', () => {
    const module = new ConnectionModule();

    beforeAll(() => {
        module.configure();
    });

    test('Should have expected modules registered', () => {
        expect(module.isRegistered(ConnectionStringModule)).toBeTruthy();
    });
});
