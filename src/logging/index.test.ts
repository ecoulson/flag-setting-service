import { LoggingModule } from '.';
import { EnvironmentModule } from '../environment';
import { ConsoleLoggerModule } from './console';
import { LogLevelModule } from './log-level';
import { LoggerAnnotation } from './logging-annotations';
import { TimestampModule } from './timestamp';

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

    test('Should register expected modules', () => {
        expect(module.isRegistered(LogLevelModule)).toBeTruthy();
        expect(module.isRegistered(ConsoleLoggerModule)).toBeTruthy();
        expect(module.isRegistered(TimestampModule)).toBeTruthy();
    });
});
