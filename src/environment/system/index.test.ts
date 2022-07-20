import { SystemEnvironmentModule } from '.';
import {
    ProcessEnvironmentAnnotation,
    SystemEnvironmentAnnotation,
} from './system-annotation';

describe('System Environment Test Suite', () => {
    const module = new SystemEnvironmentModule();
    beforeAll(() => {
        module.configure();
    });

    test('Should resolve the process environment', () => {
        const processEnvironment = module.resolve(ProcessEnvironmentAnnotation);

        expect(processEnvironment).not.toBeNull();
    });

    test('Should resolve the system environment', () => {
        const systemEnvironment = module.resolve(SystemEnvironmentAnnotation);

        expect(systemEnvironment).not.toBeNull();
    });
});
