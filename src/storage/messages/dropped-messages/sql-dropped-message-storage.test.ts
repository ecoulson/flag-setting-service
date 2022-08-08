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
import { DroppedMessage } from '../../../models/messages/dropped-message';
import { SQLDroppedMessageStorage } from './sql-dropped-message-storage';

describe('SQL Dropped Message Storage Test Suite', () => {
    const subscriberId = '07873314-86e5-46c1-92ca-41643e7ae2da';
    const messageId = 'bd32ed0f-428d-4f1d-946b-3482c1b8664c';
    const mockedDataSource = mock<MessageDataSource>();
    const mockedBroker = mock<Broker<DroppedMessage>>();
    const mockedLogger = mock<Logger>();
    when(mockedDataSource.getDroppedMessageBroker()).thenReturn(
        Optional.of(instance(mockedBroker))
    );
    const storage = new SQLDroppedMessageStorage(
        instance(mockedDataSource),
        instance(mockedLogger)
    );

    beforeEach(() => {
        reset(mockedBroker);
        reset(mockedLogger);
    });

    test('Should find messages by subscriber id', async () => {
        const expectedMessages = [
            new DroppedMessage(messageId, 'topic', subscriberId, {}),
        ];
        when(mockedBroker.findWhere(anything())).thenResolve(expectedMessages);

        const messages = await storage.findBySubscriberId(subscriberId);

        expect(messages).toEqual(expectedMessages);
        verify(mockedBroker.findWhere(anything())).once();
        const [query] = capture(mockedBroker.findWhere).last();
        expect(query).toEqual({
            subscriberId,
        });
    });
});
