import { Injectable } from 'noose-injection';
import { Event } from '../../models/events/event';
import { Message } from '../../models/messages/message';
import { MessageStorage } from '../../storage/messages/message-storage';
import { MessageStorageAnnotation } from '../../storage/messages/message-storage-annotations';
import { EventEmitter } from '../../events/emitter/event-emitter';
import { EventEmitterAnnotation } from '../../events/emitter/event-emitter-annotations';
import { UUIDIdentifierGeneratorAnnotation } from '../../identifiers/identifier-annotations';
import { IdentifierGenerator } from '../../identifiers/identifier-generator';
import { MessageQueueIdempotency } from '../idempotency/message-queue-idempotency';
import { MessageQueueIdempotencyAnnotation } from '../idempotency/message-queue-idempotency-annotations';
import { MessageQueueSubscriberHandler } from '../../models/message-queue/message-queue-subscriber-handler';
import { MessageQueue } from '../message-queue';
import { Optional } from '../../common/optional/optional';
import { MessageQueueSubscriber } from '../../models/message-queue/message-queue-subscriber';
import { Status } from '../../common/status/status';
import { LinearRetryStrategyAnnotation } from '../retry-strategy/linear/linear-retry-strategy-annotations';
import { RetryStrategy } from '../retry-strategy/retry-strategy';
import { LocalNotificationStrategyAnnotation } from '../notification-strategy/notification-strategy-annotation';
import { NotificationStrategy } from '../notification-strategy/notification-strategy';

@Injectable()
export class LocalMessageQueue implements MessageQueue {
    constructor(
        @EventEmitterAnnotation.inject()
        private readonly eventEmitter: EventEmitter,
        @UUIDIdentifierGeneratorAnnotation.inject()
        private readonly identifierService: IdentifierGenerator,
        @MessageQueueIdempotencyAnnotation.inject()
        private readonly idempotencyService: MessageQueueIdempotency,
        @MessageStorageAnnotation.inject()
        private readonly messageStorage: MessageStorage,
        @LinearRetryStrategyAnnotation.inject()
        private readonly retryStrategy: RetryStrategy,
        @LocalNotificationStrategyAnnotation.inject()
        private readonly notificationStrategy: NotificationStrategy
    ) {}

    async subscribe(
        topic: string,
        subscriber: MessageQueueSubscriber
    ): Promise<Status> {
        return this.eventEmitter.addListener(topic, async (event) => {
            await this.retryStrategy.execute(() =>
                this.notificationStrategy.notify(subscriber, event)
            );
        });
    }

    async publish(message: Message): Promise<Status> {
        const eventId = this.identifierService.generate();
        message.id = await this.idempotencyService.getIdempotentId(eventId);
        this.eventEmitter.emit(new Event(eventId, message.topic, message.data));
        await this.messageStorage.create(message);
        return Status.ok();
    }
}
