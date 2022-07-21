import { LoggingModule } from '.';
import { EnvironmentModule } from '../environment';
import LogLevelModule from './log-level';
import { LoggerAnnotation } from './logging-annotations';

describe('Logging Module Test Suite', () => {
    const module = new LoggingModule();

    beforeAll(() => {
        new EnvironmentModule().configure();
        new LogLevelModule().configure();
        module.configure();
    });

    test('Should resolve the logger annotation', () => {
        const logger = module.resolve(LoggerAnnotation);

        expect(logger).not.toBeNull();
    });
});
