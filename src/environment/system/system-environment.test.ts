import { instance, mock, when } from 'ts-mockito';
import { SystemEnvironment } from './system-environment';

describe('System Environment Test Suite', () => {
    const mockedProcessEnvironment = mock<NodeJS.ProcessEnv>();
    const systemEnvironment = new SystemEnvironment(
        instance(mockedProcessEnvironment)
    );
    const variableName = 'DATABASE_URL';

    test('Should get an empty optional when the variable does not exist in the environment', () => {
        when(mockedProcessEnvironment[variableName]).thenReturn(undefined);

        const variable = systemEnvironment.get(variableName);

        expect(variable.isEmpty());
    });

    test('Should get a variable value from the environment', () => {
        when(mockedProcessEnvironment[variableName]).thenReturn('foo');

        const variable = systemEnvironment.get(variableName);

        expect(variable.get()).toEqual('foo');
    });
});
