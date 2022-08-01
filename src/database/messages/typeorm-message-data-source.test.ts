import { instance, mock, reset, when } from 'ts-mockito';
import { Logger } from '../../logging/logger';
import { ConnectionString } from '../connection-string/connection-string';
import { DatabaseDebugInfo } from '../debug-info/database-debug-info';
import { Dialect } from '../dialect/dialect';
import { TypeORMDataSourceFactory } from '../typeorm/typeorm-data-source-factory';
import { MessageDatabaseEntities } from './message-database-entities';
import { TypeORMMessageDataSource } from './typeorm-message-data-source';
import { DataSource as TypeORMDataSource, Repository } from 'typeorm';
import { Message } from '../../models/messages/message';

describe('TypeORM Message Data Source Test Suite', () => {
    const mockedDataSourceFactory = mock<TypeORMDataSourceFactory>();
    const mockedConnectionString = mock<ConnectionString>();
    const mockedDialect = mock<Dialect>();
    const mockedDebugInfo = mock<DatabaseDebugInfo>();
    const mockedDatabaseEntities = mock(MessageDatabaseEntities);
    const mockedLogger = mock<Logger>();
    const mockedDataSource = mock<TypeORMDataSource>();
    const mockedRepository = mock<Repository<Message>>();
    when(mockedDataSourceFactory.buildPostgresDatabase()).thenReturn(
        instance(mockedDataSource)
    );
    const dataSource = new TypeORMMessageDataSource(
        instance(mockedDataSourceFactory),
        instance(mockedConnectionString),
        instance(mockedDialect),
        instance(mockedDebugInfo),
        instance(mockedDatabaseEntities),
        instance(mockedLogger)
    );

    beforeEach(() => {
        reset(mockedDataSourceFactory);
        reset(mockedConnectionString);
        reset(mockedDialect);
        reset(mockedDebugInfo);
        reset(mockedDatabaseEntities);
        reset(mockedLogger);
        reset(mockedDataSource);
        reset(mockedRepository);
        when(mockedDataSourceFactory.buildPostgresDatabase()).thenReturn(
            instance(mockedDataSource)
        );
    });

    test('Should get the message broker', () => {
        when(mockedDataSource.getRepository(Message)).thenReturn(
            instance(mockedRepository)
        );

        const broker = dataSource.getMessageBroker();

        expect(broker).not.toBeNull();
    });
});
