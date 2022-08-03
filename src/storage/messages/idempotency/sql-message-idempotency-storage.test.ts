import {
    anything,
    capture,
    instance,
    mock,
    reset,
    verify,
    when,
} from 'ts-mockito';
import { Optional } from '../../../common/optional/optional';
import { Broker } from '../../../database/broker/broker';
import { MessageDataSource } from '../../../database/messages/message-data-source';
import { Logger } from '../../../logging/logger';
import { MessageIdempotencyMapping } from '../../../models/messages/message-idempotency-mapping';
import { SQLMessageIdempotencyStorage } from './sql-message-idempotency-storage';

describe('SQL Message Idempotency Storage Test Suite', () => {
    const eventId = '07873314-86e5-46c1-92ca-41643e7ae2da';
    const idempotentId = '4f158c46-3951-48ab-81d8-1cc7699a366f';
    const mockedDataSource = mock<MessageDataSource>();
    const mockedBroker = mock<Broker<MessageIdempotencyMapping>>();
    const mockedLogger = mock<Logger>();
    when(mockedDataSource.getMessageIdempotencyBroker()).thenReturn(
        Optional.of(instance(mockedBroker))
    );
    const service = new SQLMessageIdempotencyStorage(
        instance(mockedDataSource),
        instance(mockedLogger)
    );

    beforeEach(() => {
        reset(mockedLogger);
        reset(mockedBroker);
    });

    test('Should get event id from idempotent id', async () => {
        const expectedMapping = new MessageIdempotencyMapping(
            eventId,
            idempotentId
        );
        when(mockedBroker.findOneWhere(anything())).thenResolve(
            expectedMapping
        );

        const actualMapping = await service.findMappingByIdempotentId(
            idempotentId
        );

        expect(actualMapping.get()).toEqual(expectedMapping);
        verify(mockedBroker.findOneWhere(anything())).once();
        const [query] = capture(mockedBroker.findOneWhere).last();
        expect(query).toEqual({
            idempotentId,
        });
    });
});
