import { anyFunction, instance, mock, reset, verify, when } from 'ts-mockito';
import { Optional } from '../../common/optional/optional';
import { Message } from '../../models/messages/message';
import { MessageStorage } from '../../storage/messages/message-storage';
import { EventEmitter } from '../../events/emitter/event-emitter';
import { IdentifierGenerator } from '../../identifiers/identifier-generator';
import { MessageQueueIdempotency } from '../idempotency/message-queue-idempotency';
import { LocalMessageQueue } from './local-message-queue';
import { MessageQueueSubscriber } from '../../models/message-queue/message-queue-subscriber';
import { MessageQueueSubscriberHandler } from '../../models/message-queue/message-queue-subscriber-handler';
import { RetryStrategy } from '../retry-strategy/retry-strategy';
import { Status } from '../../common/status/status';
import { NotificationStrategy } from '../notification-strategy/notification-strategy';

describe('Local Message Queue Test Suite', () => {
    const mockedIdempotency = mock<MessageQueueIdempotency>();
    const mockedIdentifierService = mock<IdentifierGenerator>();
    const mockedMessageStorage = mock<MessageStorage>();
    const mockedRetryStrategy = mock<RetryStrategy>();
    const mockedNotificationStrategy = mock<NotificationStrategy>();
    const id = '4f158c46-3951-48ab-81d8-1cc7699a366f';
    const eventId = 'ea5e861a-0c1b-4aed-978a-52c47830b632';
    const subscriberId = '124e53b2-4a0b-41c5-b115-f077ac424d1f';
    const eventEmitter = new EventEmitter();
    const messageQueue = new LocalMessageQueue(
        eventEmitter,
        instance(mockedIdentifierService),
        instance(mockedIdempotency),
        instance(mockedMessageStorage),
        instance(mockedRetryStrategy),
        instance(mockedNotificationStrategy)
    );

    beforeEach(() => {
        reset(mockedIdentifierService);
        reset(mockedIdempotency);
        reset(mockedMessageStorage);
        reset(mockedRetryStrategy);
        reset(mockedNotificationStrategy);
        eventEmitter.removeAllListeners();
    });

    test('Should publish an event', async () => {
        const inputMessage = new Message(id, 'test', {});
        when(mockedIdentifierService.generate()).thenReturn(eventId);
        when(mockedIdempotency.getIdempotentId(eventId)).thenResolve(id);
        when(mockedMessageStorage.create(inputMessage)).thenResolve(
            Optional.of(inputMessage)
        );

        const result = await messageQueue.publish(inputMessage);

        expect(result.ok()).toBeTruthy();
        verify(mockedIdentifierService.generate()).once();
        verify(mockedMessageStorage.create(inputMessage)).once();
        verify(mockedIdempotency.getIdempotentId(eventId)).once();
    });

    test('Should subscribe to a topic', async () => {
        const subscriber = new MessageQueueSubscriber(
            subscriberId,
            jest.fn(),
            Optional.empty<MessageQueueSubscriberHandler>()
        );

        const result = await messageQueue.subscribe('topic', subscriber);

        expect(result.ok()).toBeTruthy();
    });

    test('Should provide the same message id to all handlers', async () => {
        const handler = jest.fn();
        const subscriber = new MessageQueueSubscriber(
            subscriberId,
            handler,
            Optional.empty<MessageQueueSubscriberHandler>()
        );
        const message = new Message(id, 'topic', {});
        when(mockedIdentifierService.generate()).thenReturn(eventId);
        when(mockedIdempotency.getIdempotentId(eventId)).thenResolve(id);
        when(mockedMessageStorage.findById(message.id)).thenResolve(
            Optional.of(message)
        );
        when(mockedRetryStrategy.execute(anyFunction())).thenResolve(
            Status.ok()
        );
        await messageQueue.subscribe('topic', subscriber);
        await messageQueue.subscribe('topic', subscriber);

        const status = await messageQueue.publish(new Message(id, 'topic', {}));

        await new Promise(process.nextTick);
        expect(status.ok()).toBeTruthy();
        verify(mockedRetryStrategy.execute(anyFunction())).twice();
    });
});
