import {
    anyOfClass,
    capture,
    instance,
    mock,
    reset,
    verify,
    when,
} from 'ts-mockito';
import { Optional } from '../../common/optional/optional';
import { MessageQueueSubscriber } from '../../models/message-queue/message-queue-subscriber';
import { MessageQueueSubscriberHandler } from '../../models/message-queue/message-queue-subscriber-handler';
import { DroppedMessage } from '../../models/messages/dropped-message';
import { Message } from '../../models/messages/message';
import { DroppedMessageStorage } from '../../storage/messages/dropped-messages/dropped-message-storage';
import { LocalDeadLetterQueue } from './local-dead-letter-queue';

describe('Local Dead Letter Queue Test Suite', () => {
    const mockedStorage = mock<DroppedMessageStorage>();
    const queue = new LocalDeadLetterQueue(instance(mockedStorage));
    const subscriberId = '07873314-86e5-46c1-92ca-41643e7ae2da';
    const messageId = 'bd32ed0f-428d-4f1d-946b-3482c1b8664c';

    beforeEach(() => {
        reset(mockedStorage);
    });

    test('Should add a dropped message to the dead letter queue', async () => {
        const subscriber = new MessageQueueSubscriber(
            subscriberId,
            jest.fn(),
            Optional.empty<MessageQueueSubscriberHandler>()
        );
        const message = new Message(messageId, 'topic', {});
        const expectedDroppedMessage = new DroppedMessage(
            message.id,
            message.topic,
            subscriber.id,
            message.data
        );
        when(mockedStorage.create(anyOfClass(DroppedMessage))).thenResolve(
            Optional.of(expectedDroppedMessage)
        );

        const status = await queue.addDroppedMessage(subscriber, message);

        expect(status.ok()).toBeTruthy();
        verify(mockedStorage.create(anyOfClass(DroppedMessage))).once();
        const [actualDroppedMessage] = capture(mockedStorage.create).last();
        expect(actualDroppedMessage).toEqual(expectedDroppedMessage);
    });

    test('Should not add a dropped message to the dead letter queue when create fails', async () => {
        const subscriber = new MessageQueueSubscriber(
            subscriberId,
            jest.fn(),
            Optional.empty<MessageQueueSubscriberHandler>()
        );
        const message = new Message(messageId, 'topic', {});
        const expectedDroppedMessage = new DroppedMessage(
            message.id,
            message.topic,
            subscriber.id,
            message.data
        );
        when(mockedStorage.create(anyOfClass(DroppedMessage))).thenResolve(
            Optional.empty()
        );

        const status = await queue.addDroppedMessage(subscriber, message);

        expect(status.ok()).toBeFalsy();
        verify(mockedStorage.create(anyOfClass(DroppedMessage))).once();
        const [actualDroppedMessage] = capture(mockedStorage.create).last();
        expect(actualDroppedMessage).toEqual(expectedDroppedMessage);
    });
});
