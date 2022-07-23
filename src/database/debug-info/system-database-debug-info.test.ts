import { anything, instance, mock, reset, when } from 'ts-mockito';
import { Optional } from '../../common/optional/optional';
import { Environment } from '../../environment/environment';
import { EnvironmentVariable } from '../../environment/variable/environment-variable';
import { LogLevelType } from '../../logging/log-level/log-level-type';
import { DatabaseDebugOptions } from './database-debug-options';
import { SystemDatabaseDebugInfo } from './system-database-debug-info';

describe('System Database Debug Info Test Suite', () => {
    const mockedEnvironment = mock<Environment>();
    const logLevel = new EnvironmentVariable('LOG_LEVEL');
    const dropSchema = new EnvironmentVariable('DROP_SCHEMA');
    const synchronize = new EnvironmentVariable('SYNCRHONIZE');
    const systemDebugInfo = new SystemDatabaseDebugInfo(
        instance(mockedEnvironment),
        logLevel,
        dropSchema,
        synchronize
    );

    beforeEach(() => {
        reset(mockedEnvironment);
    });

    test('Should get default debug options when all environment variables are not set', () => {
        when(mockedEnvironment.get(anything())).thenReturn(Optional.empty());

        const options = systemDebugInfo.get();

        expect(options).toEqual<DatabaseDebugOptions>({
            dropSchema: false,
            synchronize: false,
            logging: true,
        });
    });

    test('Should get default debug options when drop schema is set', () => {
        when(mockedEnvironment.get(anything())).thenReturn(Optional.empty());
        when(mockedEnvironment.get(dropSchema)).thenReturn(Optional.of('true'));

        const options = systemDebugInfo.get();

        expect(options).toEqual<DatabaseDebugOptions>({
            dropSchema: true,
            synchronize: false,
            logging: true,
        });
    });

    test('Should get default debug options when synchronize is set', () => {
        when(mockedEnvironment.get(anything())).thenReturn(Optional.empty());
        when(mockedEnvironment.get(synchronize)).thenReturn(
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
        when(mockedEnvironment.get(anything())).thenReturn(Optional.empty());
        when(mockedEnvironment.get(logLevel)).thenReturn(
            Optional.of(LogLevelType.WARN.toString())
        );

        const options = systemDebugInfo.get();

        expect(options).toEqual<DatabaseDebugOptions>({
            dropSchema: false,
            synchronize: false,
            logging: false,
        });
    });
});
