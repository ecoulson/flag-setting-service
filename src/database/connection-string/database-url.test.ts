import { instance, mock, reset, when } from 'ts-mockito';
import { Optional } from '../../common/optional/optional';
import { SystemEnvironment } from '../../environment/system/system-environment';
import { DatabaseURL } from './database-url';

describe('Database URL Test Suite', () => {
    const mockedSystemEnvironment = mock(SystemEnvironment);

    beforeEach(() => {
        reset(mockedSystemEnvironment);
    });

    test('Should retireve an empty database url', () => {
        when(mockedSystemEnvironment.get('DATABASE_URL')).thenReturn(
            Optional.empty()
        );
        const databaseURL = new DatabaseURL(instance(mockedSystemEnvironment));

        const value = databaseURL.value();

        expect(value.isEmpty()).toBeTruthy();
    });

    test('Should retireve database url from the environment', () => {
        const databaseURL = new DatabaseURL(instance(mockedSystemEnvironment));
        when(mockedSystemEnvironment.get('DATABASE_URL')).thenReturn(
            Optional.of('database_url')
        );

        const value = databaseURL.value();

        expect(value.get()).toEqual('database_url');
    });
});
