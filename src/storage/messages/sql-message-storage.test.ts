import {
    anything,
    capture,
    instance,
    mock,
    reset,
    verify,
    when,
} from 'ts-mockito';
import { MessageDataSource } from '../../database/messages/message-data-source';
import { Message } from '../../models/messages/message';
import { SQLMessageStorage } from './sql-message-storage';
import { Broker } from '../../database/broker/broker';

describe('SQL Message Storage Test Suite', () => {
    const id = '8a8b0354-b29c-47a8-a332-ef601e198346';
    const mockedDataSource = mock<MessageDataSource>();
    const mockedBroker = mock<Broker<Message>>();
    when(mockedDataSource.getMessageBroker()).thenReturn(
        instance(mockedBroker)
    );
    const storage = new SQLMessageStorage(instance(mockedDataSource));

    beforeEach(() => {
        reset(mockedBroker);
    });

    test('Should find all messages with a given topic', async () => {
        const expectedMessages = [new Message(id, 'topic', 'data')];
        when(mockedBroker.findWhere(anything())).thenResolve(expectedMessages);

        const actualMessages = await storage.findByTopic('topic');

        expect(actualMessages).toEqual(expectedMessages);
        const [query] = capture(mockedBroker.findWhere).last();
        expect(query).toEqual({
            topic: 'topic',
        });
        verify(mockedBroker.findWhere(anything())).once();
    });
});
