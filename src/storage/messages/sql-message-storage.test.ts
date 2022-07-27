import {
    anything,
    capture,
    instance,
    mock,
    reset,
    verify,
    when,
} from 'ts-mockito';
import { Repository } from 'typeorm';
import { Message } from '../../models/messages/message';
import { SQLMessageStorage } from './sql-message-storage';

describe('SQL Message Storage Test Suite', () => {
    const id = '8a8b0354-b29c-47a8-a332-ef601e198346';
    const mockedRepository = mock<Repository<Message>>();
    const storage = new SQLMessageStorage(instance(mockedRepository));

    beforeEach(() => {
        reset(mockedRepository);
    });

    test('Should find all messages with a given topic', async () => {
        const expectedMessages = [new Message(id, 'topic', 'data')];
        when(mockedRepository.find(anything())).thenResolve(expectedMessages);

        const actualMessages = await storage.findByTopic('topic');

        expect(actualMessages).toEqual(expectedMessages);
        const [query] = capture(mockedRepository.find).last();
        expect(query).toEqual({
            where: {
                topic: 'topic',
            },
        });
        verify(mockedRepository.find(anything())).once();
    });
});
