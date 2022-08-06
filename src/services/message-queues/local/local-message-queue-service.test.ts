import { anyOfClass, instance, mock, reset, verify, when } from 'ts-mockito';
import { Optional } from '../../../common/optional/optional';
import { Message } from '../../../models/messages/message';
import { MessageStorage } from '../../../storage/messages/message-storage';
import { EventEmitter } from '../../events/emitter/event-emitter';
import { IdentifierService } from '../../identifier/identifier-service';
import { MessageIdempotencyService } from '../idempotency/message-idempotency-service';
import { LocalMessageQueueService } from './local-message-queue-service';

describe('Local Message Queue Service Test Suite', () => {
    const mockedIdempotencyService = mock<MessageIdempotencyService>();
    const mockedIdentifierService = mock<IdentifierService>();
    const mockedMessageStorage = mock<MessageStorage>();
    const id = '4f158c46-3951-48ab-81d8-1cc7699a366f';
    const eventId = 'ea5e861a-0c1b-4aed-978a-52c47830b632';
    const messageQueue = new LocalMessageQueueService(
        new EventEmitter(),
        instance(mockedIdentifierService),
        instance(mockedIdempotencyService),
        instance(mockedMessageStorage)
    );

    beforeEach(() => {
        reset(mockedIdentifierService);
        reset(mockedIdempotencyService);
        reset(mockedMessageStorage);
    });

    test('Should publish an event', async () => {
        const inputMessage = new Message(id, 'test', {});
        when(mockedIdentifierService.generateId()).thenReturn(eventId);

        const result = await messageQueue.publish(inputMessage);

        expect(result).toBeTruthy();
        verify(mockedIdentifierService.generateId()).once();
    });

    test('Should subscribe to a topic', async () => {
        const handler = jest.fn();

        const result = await messageQueue.subscribe('topic', handler);

        expect(result).toBeTruthy();
    });

    test('Should provide the same message id to all handlers', async () => {
        const handler = jest.fn();
        const message = new Message(id, 'topic', {});
        when(mockedIdempotencyService.getIdempotentId(eventId)).thenResolve(id);
        when(mockedIdentifierService.generateId()).thenReturn(eventId);
        when(mockedMessageStorage.create(anyOfClass(Message))).thenResolve(
            Optional.of(message)
        );
        when(mockedMessageStorage.findById(message.id)).thenResolve(
            Optional.of(message)
        );
        await Promise.all([
            messageQueue.subscribe('topic', handler),
            messageQueue.subscribe('topic', handler),
        ]);

        await messageQueue.publish(new Message(id, 'topic', {}));
        await new Promise(process.nextTick);

        expect(handler).toBeCalledTimes(2);
        expect(handler).toHaveBeenNthCalledWith(
            1,
            new Message(id, 'topic', {})
        );
        expect(handler).toHaveBeenNthCalledWith(
            2,
            new Message(id, 'topic', {})
        );
    });
});
