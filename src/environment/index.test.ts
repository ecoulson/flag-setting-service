import { EnvironmentModule } from '.';
import { SystemEnvironmentModule } from './system';
import { EnvironmentVariableModule } from './variable';

describe('Environment Module Test Suite', () => {
    const module = new EnvironmentModule();

    beforeAll(() => {
        module.configure();
    });

    test('Should register the expected modules', () => {
        expect(module.isRegistered(EnvironmentVariableModule)).toBeTruthy();
        expect(module.isRegistered(SystemEnvironmentModule)).toBeTruthy();
    });
});
