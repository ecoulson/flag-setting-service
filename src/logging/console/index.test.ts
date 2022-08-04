import chalk from 'chalk';
import { ConsoleLoggerModule } from '.';
import { EnvironmentModule } from '../../environment';
import { LogLevelModule } from '../log-level';
import { TimestampModule } from '../timestamp';
import { ConsoleLogger } from './console-logger';
import {
    ChalkAnnotation,
    ConsoleLoggerAnnotation,
} from './console-logger-annotations';

describe('Console Logger Module Test Suite', () => {
    const module = new ConsoleLoggerModule();

    beforeAll(() => {
        new LogLevelModule().configure();
        new EnvironmentModule().configure();
        new TimestampModule().configure();
        module.configure();
    });

    test('Should resolve the console logger', () => {
        const logger = module.resolve(ConsoleLoggerAnnotation);

        expect(logger).toBeInstanceOf(ConsoleLogger);
    });

    test('Should resolve chalk annotation', () => {
        const chalkInstance = module.resolve(ChalkAnnotation);

        expect(chalkInstance).toEqual(chalk);
    });
});
