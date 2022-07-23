import { instance, mock, when } from 'ts-mockito';
import { EnvironmentVariable } from '../variable/environment-variable';
import { SystemEnvironment } from './system-environment';

describe('System Environment Test Suite', () => {
    const mockedProcessEnvironment = mock<NodeJS.ProcessEnv>();
    const systemEnvironment = new SystemEnvironment(
        instance(mockedProcessEnvironment)
    );
    const variable = new EnvironmentVariable('DATABASE_URL');

    test('Should get an empty optional when the variable does not exist in the environment', () => {
        when(mockedProcessEnvironment[variable.name()]).thenReturn(undefined);

        const value = systemEnvironment.get(variable);

        expect(value.isEmpty());
    });

    test('Should get a variable value from the environment', () => {
        when(mockedProcessEnvironment[variable.name()]).thenReturn('foo');

        const value = systemEnvironment.get(variable);

        expect(value.get()).toEqual('foo');
    });
});
