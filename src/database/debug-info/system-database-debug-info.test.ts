import { anyString, instance, mock, reset, when } from 'ts-mockito';
import { Optional } from '../../common/optional/optional';
import { Environment } from '../../environment/environment';
import { LogLevel } from '../../logging/log-level';
import { DatabaseDebugOptions } from './database-debug-options';
import { SystemDatabaseDebugInfo } from './system-database-debug-info';

describe('System Database Debug Info Test Suite', () => {
    const mockedEnvironment = mock<Environment>();
    const systemDebugInfo = new SystemDatabaseDebugInfo(
        instance(mockedEnvironment)
    );

    beforeEach(() => {
        reset(mockedEnvironment);
    });

    test('Should get default debug options when all environment variables are not set', () => {
        when(mockedEnvironment.get(anyString())).thenReturn(Optional.empty());

        const options = systemDebugInfo.get();

        expect(options).toEqual<DatabaseDebugOptions>({
            dropSchema: false,
            synchronize: false,
            logging: true,
        });
    });

    test('Should get default debug options when drop schema is set', () => {
        when(mockedEnvironment.get(anyString())).thenReturn(Optional.empty());
        when(mockedEnvironment.get('DROP_SCHEMA')).thenReturn(
            Optional.of('true')
        );

        const options = systemDebugInfo.get();

        expect(options).toEqual<DatabaseDebugOptions>({
            dropSchema: true,
            synchronize: false,
            logging: true,
        });
    });

    test('Should get default debug options when synchronize is set', () => {
        when(mockedEnvironment.get(anyString())).thenReturn(Optional.empty());
        when(mockedEnvironment.get('SYNCHRONIZE')).thenReturn(
            Optional.of('true')
        );

        const options = systemDebugInfo.get();

        expect(options).toEqual<DatabaseDebugOptions>({
            dropSchema: false,
            synchronize: true,
            logging: true,
        });
    });

    test('Should get default debug options when log level is not in logging range', () => {
        when(mockedEnvironment.get(anyString())).thenReturn(Optional.empty());
        when(mockedEnvironment.get('LOG_LEVEL')).thenReturn(
            Optional.of(LogLevel.WARN.toString())
        );

        const options = systemDebugInfo.get();

        expect(options).toEqual<DatabaseDebugOptions>({
            dropSchema: false,
            synchronize: false,
            logging: false,
        });
    });
});
