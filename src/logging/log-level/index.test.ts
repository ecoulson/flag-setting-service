import { LogLevelModule } from '.';
import { EnvironmentModule } from '../../environment';
import { LogLevelAnnotation } from './log-level-annotations';

describe('Log Level Module Test Suite', () => {
    const module = new LogLevelModule();

    beforeAll(() => {
        new EnvironmentModule().configure();
        module.configure();
    });

    test('Should resolve the log level from the module', () => {
        const logLevel = module.resolve(LogLevelAnnotation);

        expect(logLevel).not.toBeNull();
    });
});
