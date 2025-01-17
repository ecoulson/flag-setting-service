import {
    anyOfClass,
    anyString,
    instance,
    mock,
    reset,
    verify,
    when,
} from 'ts-mockito';
import { ConsoleLogger } from './console-logger';
import { LogLevel } from '../log-level/log-level';
import { LogLevelType } from '../log-level/log-level-type';
import { Optional } from '../../common/optional/optional';
import { Chalk } from 'chalk';
import { TimestampGenerator } from '../timestamp/timestamp-generator';
import { TimestampFormatter } from '../timestamp/timestamp-formatter';
import { UTCDatetime } from '../../models/timestamp/utc-datetime';

describe('Console Logger Test Suite', () => {
    const mockedLogLevel = mock(LogLevel);
    const mockedChalk = mock<Chalk>();
    const mockedTimestampGenerator = mock<TimestampGenerator>();
    const mockedTimestampFormatter = mock<TimestampFormatter>();
    const logger = new ConsoleLogger(
        instance(mockedLogLevel),
        instance(mockedChalk),
        instance(mockedTimestampGenerator),
        instance(mockedTimestampFormatter)
    );

    beforeEach(() => {
        reset(mockedLogLevel);
        reset(mockedChalk);
        reset(mockedTimestampFormatter);
        reset(mockedTimestampGenerator);
    });

    test('Should log a fatal message when the log level is fatal', async () => {
        when(mockedLogLevel.level()).thenReturn(LogLevelType.FATAL);
        when(mockedLogLevel.getDisplayString(LogLevelType.FATAL)).thenReturn(
            Optional.of('fatal')
        );
        when(mockedChalk.bold(anyString())).thenCall((x) => x);
        when(mockedChalk.black(anyString())).thenCall((x) => x);
        when(mockedChalk.underline(anyString())).thenCall((x) => x);
        when(mockedChalk.blue(anyString())).thenCall((x) => x);
        when(mockedTimestampGenerator.generateCurrentTimestamp()).thenReturn(
            new UTCDatetime(2022, 2, 2, 2, 2, 2, 2)
        );
        when(mockedTimestampFormatter.format(anyString())).thenReturn(
            'timestamp'
        );

        const result = await logger.fatal('message');

        expect(result.ok()).toBeTruthy();
        verify(mockedLogLevel.level()).once();
        verify(mockedLogLevel.getDisplayString(LogLevelType.FATAL)).once();
        verify(mockedChalk.black(anyString())).once();
        verify(mockedTimestampGenerator.generateCurrentTimestamp()).once();
        verify(mockedTimestampFormatter.format(anyOfClass(UTCDatetime))).once();
    });

    test('Should log an error message when the log level is error', async () => {
        when(mockedLogLevel.level()).thenReturn(LogLevelType.ERROR);
        when(mockedLogLevel.getDisplayString(LogLevelType.ERROR)).thenReturn(
            Optional.of('error')
        );
        when(mockedChalk.bold(anyString())).thenCall((x) => x);
        when(mockedChalk.red(anyString())).thenCall((x) => x);
        when(mockedChalk.underline(anyString())).thenCall((x) => x);
        when(mockedChalk.blue(anyString())).thenCall((x) => x);
        when(mockedTimestampGenerator.generateCurrentTimestamp()).thenReturn(
            new UTCDatetime(2022, 2, 2, 2, 2, 2, 2)
        );
        when(mockedTimestampFormatter.format(anyString())).thenReturn(
            'timestamp'
        );

        const result = await logger.error('message');

        expect(result.ok()).toBeTruthy();
        verify(mockedLogLevel.level()).once();
        verify(mockedLogLevel.getDisplayString(LogLevelType.ERROR)).once();
        verify(mockedChalk.red(anyString())).once();
        verify(mockedTimestampGenerator.generateCurrentTimestamp()).once();
        verify(mockedTimestampFormatter.format(anyOfClass(UTCDatetime))).once();
    });

    test('Should not log an error message when the log level is fatal', async () => {
        when(mockedLogLevel.level()).thenReturn(LogLevelType.FATAL);

        const result = await logger.error('message');

        expect(result.ok()).toBeFalsy();
        verify(mockedLogLevel.level()).twice();
        verify(mockedLogLevel.getDisplayString(LogLevelType.ERROR)).once();
        verify(mockedChalk.red(anyString())).never();
        verify(mockedTimestampGenerator.generateCurrentTimestamp()).never();
        verify(
            mockedTimestampFormatter.format(anyOfClass(UTCDatetime))
        ).never();
    });

    test('Should log an warn message when the log level is warn', async () => {
        when(mockedLogLevel.level()).thenReturn(LogLevelType.WARN);
        when(mockedLogLevel.getDisplayString(LogLevelType.WARN)).thenReturn(
            Optional.of('warn')
        );
        when(mockedChalk.bold(anyString())).thenCall((x) => x);
        when(mockedChalk.yellow(anyString())).thenCall((x) => x);
        when(mockedChalk.underline(anyString())).thenCall((x) => x);
        when(mockedChalk.blue(anyString())).thenCall((x) => x);
        when(mockedTimestampGenerator.generateCurrentTimestamp()).thenReturn(
            new UTCDatetime(2022, 2, 2, 2, 2, 2, 2)
        );
        when(mockedTimestampFormatter.format(anyString())).thenReturn(
            'timestamp'
        );

        const result = await logger.warn('message');

        expect(result.ok()).toBeTruthy();
        verify(mockedLogLevel.level()).once();
        verify(mockedLogLevel.getDisplayString(LogLevelType.WARN)).once();
        verify(mockedChalk.yellow(anyString())).once();
        verify(mockedTimestampGenerator.generateCurrentTimestamp()).once();
        verify(mockedTimestampFormatter.format(anyOfClass(UTCDatetime))).once();
    });

    test('Should not log an warn message when the log level is error', async () => {
        when(mockedLogLevel.level()).thenReturn(LogLevelType.ERROR);

        const result = await logger.warn('message');

        expect(result.ok()).toBeFalsy();
        verify(mockedLogLevel.level()).twice();
        verify(mockedLogLevel.getDisplayString(LogLevelType.WARN)).once();
        verify(mockedChalk.yellow(anyString())).never();
        verify(mockedTimestampGenerator.generateCurrentTimestamp()).never();
        verify(
            mockedTimestampFormatter.format(anyOfClass(UTCDatetime))
        ).never();
    });

    test('Should log an info message when the log level is info', async () => {
        when(mockedLogLevel.level()).thenReturn(LogLevelType.INFO);
        when(mockedLogLevel.getDisplayString(LogLevelType.INFO)).thenReturn(
            Optional.of('info')
        );
        when(mockedChalk.bold(anyString())).thenCall((x) => x);
        when(mockedChalk.white(anyString())).thenCall((x) => x);
        when(mockedChalk.underline(anyString())).thenCall((x) => x);
        when(mockedChalk.blue(anyString())).thenCall((x) => x);
        when(mockedTimestampGenerator.generateCurrentTimestamp()).thenReturn(
            new UTCDatetime(2022, 2, 2, 2, 2, 2, 2)
        );
        when(mockedTimestampFormatter.format(anyString())).thenReturn(
            'timestamp'
        );

        const result = await logger.info('message');

        expect(result.ok()).toBeTruthy();
        verify(mockedLogLevel.level()).once();
        verify(mockedLogLevel.getDisplayString(LogLevelType.INFO)).once();
        verify(mockedChalk.white(anyString())).once();
        verify(mockedTimestampGenerator.generateCurrentTimestamp()).once();
        verify(mockedTimestampFormatter.format(anyOfClass(UTCDatetime))).once();
    });

    test('Should not log an info message when the log level is warn', async () => {
        when(mockedLogLevel.level()).thenReturn(LogLevelType.WARN);

        const result = await logger.info('message');

        expect(result.ok()).toBeFalsy();
        verify(mockedLogLevel.level()).twice();
        verify(mockedLogLevel.getDisplayString(LogLevelType.INFO)).once();
        verify(mockedChalk.white(anyString())).never();
        verify(mockedTimestampGenerator.generateCurrentTimestamp()).never();
        verify(
            mockedTimestampFormatter.format(anyOfClass(UTCDatetime))
        ).never();
    });

    test('Should log a debug message when the log level is debug', async () => {
        when(mockedLogLevel.level()).thenReturn(LogLevelType.DEBUG);
        when(mockedLogLevel.getDisplayString(LogLevelType.DEBUG)).thenReturn(
            Optional.of('debug')
        );
        when(mockedChalk.bold(anyString())).thenCall((x) => x);
        when(mockedChalk.underline(anyString())).thenCall((x) => x);
        when(mockedChalk.blue(anyString())).thenCall((x) => x);
        when(mockedChalk.green(anyString())).thenCall((x) => x);
        when(mockedTimestampGenerator.generateCurrentTimestamp()).thenReturn(
            new UTCDatetime(2022, 2, 2, 2, 2, 2, 2)
        );
        when(mockedTimestampFormatter.format(anyString())).thenReturn(
            'timestamp'
        );

        const result = await logger.debug('message');

        expect(result.ok()).toBeTruthy();
        verify(mockedLogLevel.level()).once();
        verify(mockedLogLevel.getDisplayString(LogLevelType.DEBUG)).once();
        verify(mockedChalk.green(anyString())).once();
        verify(mockedTimestampGenerator.generateCurrentTimestamp()).once();
        verify(mockedTimestampFormatter.format(anyOfClass(UTCDatetime))).once();
    });

    test('Should not log an info message when the log level is info', async () => {
        when(mockedLogLevel.level()).thenReturn(LogLevelType.INFO);

        const result = await logger.debug('message');

        expect(result.ok()).toBeFalsy();
        verify(mockedLogLevel.level()).twice();
        verify(mockedLogLevel.getDisplayString(LogLevelType.DEBUG)).once();
        verify(mockedChalk.green(anyString())).never();
        verify(mockedTimestampGenerator.generateCurrentTimestamp()).never();
        verify(
            mockedTimestampFormatter.format(anyOfClass(UTCDatetime))
        ).never();
    });
});
