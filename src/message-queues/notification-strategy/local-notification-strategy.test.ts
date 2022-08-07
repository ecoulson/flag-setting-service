import { instance, mock, reset, verify, when } from 'ts-mockito';
import { Optional } from '../../common/optional/optional';
import { Status } from '../../common/status/status';
import { Event } from '../../models/events/event';
import { MessageQueueSubscriber } from '../../models/message-queue/message-queue-subscriber';
import { MessageQueueSubscriberHandler } from '../../models/message-queue/message-queue-subscriber-handler';
import { Message } from '../../models/messages/message';
import { MessageStorage } from '../../storage/messages/message-storage';
import { MessageQueueIdempotency } from '../idempotency/message-queue-idempotency';
import { LocalNotificationStrategy } from './local-notification-strategy';

describe('Local Notification Strategy Test Suite', () => {
    const id = '07873314-86e5-46c1-92ca-41643e7ae2da';
    const eventId = '07873314-86d5-46c1-92ca-41643e7ae2da';
    const messageId = '92373314-86d5-46c1-92ca-41643e7ae2da';
    const mockedStorage = mock<MessageStorage>();
    const mockedIdempotency = mock<MessageQueueIdempotency>();
    const strategy = new LocalNotificationStrategy(
        instance(mockedStorage),
        instance(mockedIdempotency)
    );

    beforeEach(() => {
        reset(mockedStorage);
        reset(mockedIdempotency);
    });

    test('Should successfully notify subscriber with a message', async () => {
        const handler = jest.fn(() => Promise.resolve(Status.ok()));
        const subscriber = new MessageQueueSubscriber(
            id,
            handler,
            Optional.empty<MessageQueueSubscriberHandler>()
        );
        const event = new Event(eventId, 'type', {});
        const message = new Message(messageId, 'topic', {});
        when(mockedIdempotency.getIdempotentId(eventId)).thenResolve(messageId);
        when(mockedStorage.findById(messageId)).thenResolve(
            Optional.of(message)
        );

        const result = await strategy.notify(subscriber, event);

        expect(result.ok()).toBeTruthy();
        expect(handler).toBeCalled();
        verify(mockedIdempotency.getIdempotentId(eventId)).once();
        verify(mockedStorage.findById(messageId)).once();
    });

    test('Should fail to notify subscriber when message does not exist', async () => {
        const handler = jest.fn();
        const subscriber = new MessageQueueSubscriber(
            id,
            handler,
            Optional.empty<MessageQueueSubscriberHandler>()
        );
        const event = new Event(eventId, 'type', {});
        const message = new Message(messageId, 'topic', {});
        when(mockedIdempotency.getIdempotentId(eventId)).thenResolve(messageId);
        when(mockedStorage.findById(messageId)).thenResolve(Optional.empty());

        const result = await strategy.notify(subscriber, event);

        expect(result.ok()).toBeFalsy();
        expect(handler).not.toBeCalled();
        verify(mockedIdempotency.getIdempotentId(eventId)).once();
        verify(mockedStorage.findById(messageId)).once();
    });

    test('Should fail to notify subscriber when message does not exist', async () => {
        const handler = jest.fn();
        const subscriber = new MessageQueueSubscriber(
            id,
            handler,
            Optional.empty<MessageQueueSubscriberHandler>()
        );
        const event = new Event(eventId, 'type', {});
        when(mockedIdempotency.getIdempotentId(eventId)).thenResolve(messageId);
        when(mockedStorage.findById(messageId)).thenResolve(Optional.empty());

        const result = await strategy.notify(subscriber, event);

        expect(result.ok()).toBeFalsy();
        expect(handler).not.toBeCalled();
        verify(mockedIdempotency.getIdempotentId(eventId)).once();
        verify(mockedStorage.findById(messageId)).once();
    });

    test('Should fail to notify subscriber when handler throws', async () => {
        const handler = jest.fn(() => {
            throw new Error();
        });
        const subscriber = new MessageQueueSubscriber(
            id,
            handler,
            Optional.empty<MessageQueueSubscriberHandler>()
        );
        const event = new Event(eventId, 'type', {});
        const message = new Message(messageId, 'topic', {});
        when(mockedIdempotency.getIdempotentId(eventId)).thenResolve(messageId);
        when(mockedStorage.findById(messageId)).thenResolve(
            Optional.of(message)
        );

        const result = await strategy.notify(subscriber, event);

        expect(result.ok()).toBeFalsy();
        expect(handler).toBeCalled();
        verify(mockedIdempotency.getIdempotentId(eventId)).once();
        verify(mockedStorage.findById(messageId)).once();
    });

    test('Should fail to notify subscriber when handler returns an error status', async () => {
        const handler = jest.fn(() => Promise.resolve(Status.error()));
        const subscriber = new MessageQueueSubscriber(
            id,
            handler,
            Optional.empty<MessageQueueSubscriberHandler>()
        );
        const event = new Event(eventId, 'type', {});
        const message = new Message(messageId, 'topic', {});
        when(mockedIdempotency.getIdempotentId(eventId)).thenResolve(messageId);
        when(mockedStorage.findById(messageId)).thenResolve(
            Optional.of(message)
        );

        const result = await strategy.notify(subscriber, event);

        expect(result.ok()).toBeFalsy();
        expect(handler).toBeCalled();
        verify(mockedIdempotency.getIdempotentId(eventId)).once();
        verify(mockedStorage.findById(messageId)).once();
    });
});
