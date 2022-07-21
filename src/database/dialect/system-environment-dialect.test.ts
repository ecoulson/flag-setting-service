import { anyString, instance, mock, when } from 'ts-mockito';
import { Optional } from '../../common/optional/optional';
import { Environment } from '../../environment/environment';
import { DialectType } from './dialect-type';
import { SystemEnvironmentDialect } from './system-environment-dialect';

describe('Should get the dialect from a system environment', () => {
    const mockedEnvironment = mock<Environment>();
    const dialect = new SystemEnvironmentDialect(instance(mockedEnvironment));

    test('It should get the system dialect', () => {
        when(mockedEnvironment.get(anyString())).thenReturn(
            Optional.of(DialectType.POSTGRESQL)
        );

        const type = dialect.type();

        expect(type).toEqual(DialectType.POSTGRESQL);
    });

    test('It should default to postgres when the dialect is not defined', () => {
        when(mockedEnvironment.get(anyString())).thenReturn(Optional.empty());

        const type = dialect.type();

        expect(type).toEqual(DialectType.UNKNOWN);
    });
});
