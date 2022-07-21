import { anyString, instance, mock, when } from 'ts-mockito';
import { Optional } from '../../common/optional/optional';
import { SystemEnvironment } from '../../environment/system/system-environment';
import { DialectType } from './dialect-type';
import { SystemEnvironmentDialect } from './system-environment-dialect';

describe('Should get the dialect from a system environment', () => {
    const mockedSystemEnvironment = mock(SystemEnvironment);
    const dialect = new SystemEnvironmentDialect(
        instance(mockedSystemEnvironment)
    );

    test('It should get the system dialect', () => {
        when(mockedSystemEnvironment.get(anyString())).thenReturn(
            Optional.of(DialectType.POSTGRESQL)
        );

        const type = dialect.type();

        expect(type).toEqual(DialectType.POSTGRESQL);
    });

    test('It should default to postgres when the dialect is not defined', () => {
        when(mockedSystemEnvironment.get(anyString())).thenReturn(
            Optional.empty()
        );

        const type = dialect.type();

        expect(type).toEqual(DialectType.UNKNOWN);
    });
});
