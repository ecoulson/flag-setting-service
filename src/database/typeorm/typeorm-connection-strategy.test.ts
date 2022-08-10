import { anyString, instance, mock, reset, verify, when } from 'ts-mockito';
import { Status } from '../../common/status/status';
import { EnvironmentVariable } from '../../environment/variable/environment-variable';
import { Logger } from '../../logging/logger';
import { DataSource } from '../data-source';
import { TypeORMConnectionStrategy } from './typeorm-connection-strategy';

class TestTypeORMConnectionStrategy extends TypeORMConnectionStrategy {}

describe('TypeORM Connection Strategy Test Suite', () => {
    const mockedDataSource = mock<DataSource>();
    const mockedLogger = mock<Logger>();
    const databaseUrl = new EnvironmentVariable('DATABASE_URL');
    const strategy = new TestTypeORMConnectionStrategy(
        instance(mockedDataSource),
        databaseUrl,
        instance(mockedLogger)
    );

    beforeEach(() => {
        reset(mockedDataSource);
        reset(mockedLogger);
    });

    test('Should successfully connect to typeorm', async () => {
        when(mockedDataSource.initialize(databaseUrl)).thenResolve(Status.ok());

        const status = await strategy.initialize();

        expect(status.ok()).toBeTruthy();
        verify(mockedDataSource.initialize(databaseUrl)).once();
        verify(mockedLogger.info(anyString())).once();
    });

    test('Should fail to connect to typeorm', async () => {
        when(mockedDataSource.initialize(databaseUrl)).thenResolve(
            Status.error()
        );

        const status = await strategy.initialize();

        expect(status.ok()).toBeFalsy();
        verify(mockedDataSource.initialize(databaseUrl)).once();
        verify(mockedLogger.fatal(anyString())).once();
    });
});
