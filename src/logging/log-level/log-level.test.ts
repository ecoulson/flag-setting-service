import { instance, mock, when } from 'ts-mockito';
import { Optional } from '../../common/optional/optional';
import { Environment } from '../../environment/environment';
import { LogLevel } from './log-level';
import { LogLevelType } from './log-level-type';

describe('Log Level Test Suite', () => {
    const mockedEnvironment = mock<Environment>();
    const logLevel = new LogLevel(instance(mockedEnvironment));

    test('Should get fatal level from the environment', () => {
        when(mockedEnvironment.get('LOG_LEVEL')).thenReturn(
            Optional.of('fatal')
        );

        const level = logLevel.level();

        expect(level).toEqual(LogLevelType.FATAL);
    });

    test('Should get error level from the environment', () => {
        when(mockedEnvironment.get('LOG_LEVEL')).thenReturn(
            Optional.of('error')
        );

        const level = logLevel.level();

        expect(level).toEqual(LogLevelType.ERROR);
    });

    test('Should get warn level from the environment', () => {
        when(mockedEnvironment.get('LOG_LEVEL')).thenReturn(
            Optional.of('warn')
        );

        const level = logLevel.level();

        expect(level).toEqual(LogLevelType.WARN);
    });

    test('Should get info level from the environment', () => {
        when(mockedEnvironment.get('LOG_LEVEL')).thenReturn(
            Optional.of('info')
        );

        const level = logLevel.level();

        expect(level).toEqual(LogLevelType.INFO);
    });

    test('Should get debug level from the environment', () => {
        when(mockedEnvironment.get('LOG_LEVEL')).thenReturn(
            Optional.of('debug')
        );

        const level = logLevel.level();

        expect(level).toEqual(LogLevelType.DEBUG);
    });

    test('Should get info level from the environment when the log level is not an enum value', () => {
        when(mockedEnvironment.get('LOG_LEVEL')).thenReturn(Optional.of('foo'));

        const level = logLevel.level();

        expect(level).toEqual(LogLevelType.INFO);
    });

    test('Should get info level from the environment when the log level is not set', () => {
        when(mockedEnvironment.get('LOG_LEVEL')).thenReturn(Optional.empty());

        const level = logLevel.level();

        expect(level).toEqual(LogLevelType.INFO);
    });

    test('Should get the display string for fatal level', () => {
        const displayString = logLevel.getDisplayString(LogLevelType.FATAL);

        expect(displayString.get()).toEqual('fatal');
    });

    test('Should get the display string for error level', () => {
        const displayString = logLevel.getDisplayString(LogLevelType.ERROR);

        expect(displayString.get()).toEqual('error');
    });

    test('Should get the display string for warn level', () => {
        const displayString = logLevel.getDisplayString(LogLevelType.WARN);

        expect(displayString.get()).toEqual('warn');
    });

    test('Should get the display string for info level', () => {
        const displayString = logLevel.getDisplayString(LogLevelType.INFO);

        expect(displayString.get()).toEqual('info');
    });

    test('Should get the display string for debug level', () => {
        const displayString = logLevel.getDisplayString(LogLevelType.DEBUG);

        expect(displayString.get()).toEqual('debug');
    });
});
