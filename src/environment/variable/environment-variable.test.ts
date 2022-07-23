import { EnvironmentVariable } from './environment-variable';

describe('Environment Variable Test Suite', () => {
    test('Should create an environment variable with a given name', () => {
        const variable = new EnvironmentVariable('DATABASE_URL');

        expect(variable.name()).toEqual('DATABASE_URL');
    });
});
