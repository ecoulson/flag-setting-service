import { instance, mock, reset, verify, when } from 'ts-mockito';
import { Logger } from '../../logging/logger';
import { ConnectionString } from '../connection-string/connection-string';
import { DatabaseDebugInfo } from '../debug-info/database-debug-info';
import { Dialect } from '../dialect/dialect';
import { TypeORMDataSourceFactory } from '../typeorm/typeorm-data-source-factory';
import { MessageDatabaseEntities } from './message-database-entities';
import { TypeORMMessageDataSource } from './typeorm-message-data-source';
import { DataSource as TypeORMDataSource, Repository } from 'typeorm';
import { Message } from '../../models/messages/message';
import { MessageIdempotencyMapping } from '../../models/messages/message-idempotency-mapping';
import { TypeORMBroker } from '../typeorm/typeorm-broker';
import { DroppedMessage } from '../../models/messages/dropped-message';

describe('TypeORM Message Data Source Test Suite', () => {
    const mockedDataSourceFactory = mock<TypeORMDataSourceFactory>();
    const mockedConnectionString = mock<ConnectionString>();
    const mockedDialect = mock<Dialect>();
    const mockedDebugInfo = mock<DatabaseDebugInfo>();
    const mockedDatabaseEntities = mock(MessageDatabaseEntities);
    const mockedLogger = mock<Logger>();
    const mockedDataSource = mock<TypeORMDataSource>();
    const mockedMessageRepository = mock<Repository<Message>>();
    const mockedMessageIdempotencyRepository =
        mock<Repository<MessageIdempotencyMapping>>();
    const mockedDroppedMessageRepository = mock<Repository<DroppedMessage>>();
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
        reset(mockedMessageRepository);
        when(mockedDataSourceFactory.buildPostgresDatabase()).thenReturn(
            instance(mockedDataSource)
        );
    });

    test('Should get the message broker', () => {
        when(mockedDataSource.getRepository(Message)).thenReturn(
            instance(mockedMessageRepository)
        );
        when(mockedDatabaseEntities.hasEntity(Message)).thenReturn(true);

        const broker = dataSource.getMessageBroker();

        expect(broker.get()).toBeInstanceOf(TypeORMBroker);
        verify(mockedDataSource.getRepository(Message)).once();
    });

    test('Should get the message idempotency broker', () => {
        when(
            mockedDataSource.getRepository(MessageIdempotencyMapping)
        ).thenReturn(instance(mockedMessageIdempotencyRepository));
        when(
            mockedDatabaseEntities.hasEntity(MessageIdempotencyMapping)
        ).thenReturn(true);

        const broker = dataSource.getMessageIdempotencyBroker();

        expect(broker.get()).toBeInstanceOf(TypeORMBroker);
        verify(
            mockedDataSource.getRepository(MessageIdempotencyMapping)
        ).once();
    });

    test('Should get the dropped message broker', () => {
        when(mockedDataSource.getRepository(DroppedMessage)).thenReturn(
            instance(mockedDroppedMessageRepository)
        );
        when(mockedDatabaseEntities.hasEntity(DroppedMessage)).thenReturn(true);

        const broker = dataSource.getDroppedMessageBroker();

        expect(broker.get()).toBeInstanceOf(TypeORMBroker);
        verify(mockedDataSource.getRepository(DroppedMessage)).once();
    });
});
