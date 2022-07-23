import { anyString, instance, mock, reset, when } from 'ts-mockito';
import { Optional } from '../../common/optional/optional';
import { Environment } from '../../environment/environment';
import { EnvironmentVariable } from '../../environment/variable/environment-variable';
import { DialectType } from './dialect-type';
import { SystemEnvironmentDialect } from './system-environment-dialect';

describe('Should get the dialect from a system environment', () => {
    const mockedEnvironment = mock<Environment>();
    const dialectVariable = new EnvironmentVariable('DIALECT');
    const dialect = new SystemEnvironmentDialect(
        instance(mockedEnvironment),
        dialectVariable
    );

    beforeEach(() => {
        reset(mockedEnvironment);
    });

    test('It should get the system dialect', () => {
        when(mockedEnvironment.get(dialectVariable)).thenReturn(
            Optional.of(DialectType.POSTGRESQL)
        );

        const type = dialect.type();

        expect(type).toEqual(DialectType.POSTGRESQL);
    });

    test('It should default to postgres when the dialect is not defined', () => {
        when(mockedEnvironment.get(dialectVariable)).thenReturn(
            Optional.empty()
        );

        const type = dialect.type();

        expect(type).toEqual(DialectType.UNKNOWN);
    });

    test('It should default to postgres when the dialect is not recognized', () => {
        when(mockedEnvironment.get(dialectVariable)).thenReturn(
            Optional.of('foo')
        );

        const type = dialect.type();

        expect(type).toEqual(DialectType.UNKNOWN);
    });
});
