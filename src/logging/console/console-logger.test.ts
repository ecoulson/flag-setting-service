import { instance, mock, reset, verify, when } from 'ts-mockito';
import { ConsoleLogger } from './console-logger';
import { LogLevel } from '../log-level/log-level';
import { LogLevelType } from '../log-level/log-level-type';
import { Optional } from '../../common/optional/optional';

describe('Console Logger Test Suite', () => {
    const mockedLogLevel = mock(LogLevel);
    const logger = new ConsoleLogger(instance(mockedLogLevel));

    beforeEach(() => {
        reset(mockedLogLevel);
    });

    test('Should log a fatal message when the log level is fatal', async () => {
        when(mockedLogLevel.level()).thenReturn(LogLevelType.FATAL);
        when(mockedLogLevel.getDisplayString(LogLevelType.FATAL)).thenReturn(
            Optional.of('fatal')
        );

        const result = await logger.fatal('message');

        expect(result).toBeTruthy();
        verify(mockedLogLevel.level()).once();
        verify(mockedLogLevel.getDisplayString(LogLevelType.FATAL)).once();
    });

    test('Should log an error message when the log level is error', async () => {
        when(mockedLogLevel.level()).thenReturn(LogLevelType.ERROR);
        when(mockedLogLevel.getDisplayString(LogLevelType.ERROR)).thenReturn(
            Optional.of('error')
        );

        const result = await logger.error('message');

        expect(result).toBeTruthy();
        verify(mockedLogLevel.level()).once();
        verify(mockedLogLevel.getDisplayString(LogLevelType.ERROR)).once();
    });

    test('Should not log an error message when the log level is fatal', async () => {
        when(mockedLogLevel.level()).thenReturn(LogLevelType.FATAL);

        const result = await logger.error('message');

        expect(result).toBeFalsy();
        verify(mockedLogLevel.level()).once();
        verify(mockedLogLevel.getDisplayString(LogLevelType.ERROR)).never();
    });

    test('Should log an warn message when the log level is warn', async () => {
        when(mockedLogLevel.level()).thenReturn(LogLevelType.WARN);
        when(mockedLogLevel.getDisplayString(LogLevelType.WARN)).thenReturn(
            Optional.of('warn')
        );

        const result = await logger.warn('message');

        expect(result).toBeTruthy();
        verify(mockedLogLevel.level()).once();
        verify(mockedLogLevel.getDisplayString(LogLevelType.WARN)).once();
    });

    test('Should not log an warn message when the log level is error', async () => {
        when(mockedLogLevel.level()).thenReturn(LogLevelType.ERROR);

        const result = await logger.warn('message');

        expect(result).toBeFalsy();
        verify(mockedLogLevel.level()).once();
        verify(mockedLogLevel.getDisplayString(LogLevelType.WARN)).never();
    });

    test('Should log an info message when the log level is info', async () => {
        when(mockedLogLevel.level()).thenReturn(LogLevelType.INFO);
        when(mockedLogLevel.getDisplayString(LogLevelType.INFO)).thenReturn(
            Optional.of('info')
        );

        const result = await logger.info('message');

        expect(result).toBeTruthy();
        verify(mockedLogLevel.level()).once();
        verify(mockedLogLevel.getDisplayString(LogLevelType.INFO)).once();
    });

    test('Should not log an info message when the log level is warn', async () => {
        when(mockedLogLevel.level()).thenReturn(LogLevelType.WARN);

        const result = await logger.info('message');

        expect(result).toBeFalsy();
        verify(mockedLogLevel.level()).once();
        verify(mockedLogLevel.getDisplayString(LogLevelType.INFO)).never();
    });

    test('Should log a debug message when the log level is debug', async () => {
        when(mockedLogLevel.level()).thenReturn(LogLevelType.DEBUG);
        when(mockedLogLevel.getDisplayString(LogLevelType.DEBUG)).thenReturn(
            Optional.of('debug')
        );

        const result = await logger.debug('message');

        expect(result).toBeTruthy();
        verify(mockedLogLevel.level()).once();
        verify(mockedLogLevel.getDisplayString(LogLevelType.DEBUG)).once();
    });

    test('Should not log an info message when the log level is info', async () => {
        when(mockedLogLevel.level()).thenReturn(LogLevelType.INFO);

        const result = await logger.debug('message');

        expect(result).toBeFalsy();
        verify(mockedLogLevel.level()).once();
        verify(mockedLogLevel.getDisplayString(LogLevelType.DEBUG)).never();
    });
});
