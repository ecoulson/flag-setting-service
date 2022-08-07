import { Injectable } from 'noose-injection';
import { Status } from '../../common/status/status';
import { Event } from '../../models/events/event';
import { MessageQueueSubscriber } from '../../models/message-queue/message-queue-subscriber';
import { MessageStorage } from '../../storage/messages/message-storage';
import { MessageStorageAnnotation } from '../../storage/messages/message-storage-annotations';
import { MessageQueueIdempotency } from '../idempotency/message-queue-idempotency';
import { MessageQueueIdempotencyAnnotation } from '../idempotency/message-queue-idempotency-annotations';
import { NotificationStrategy } from './notification-strategy';

@Injectable()
export class LocalNotificationStrategy implements NotificationStrategy {
    constructor(
        @MessageStorageAnnotation.inject()
        private readonly messageStorage: MessageStorage,
        @MessageQueueIdempotencyAnnotation.inject()
        private readonly idempotency: MessageQueueIdempotency
    ) {}

    async notify(
        subscriber: MessageQueueSubscriber,
        event: Event
    ): Promise<Status> {
        const messageId = await this.idempotency.getIdempotentId(event.id);
        const message = await this.messageStorage.findById(messageId);
        if (message.isEmpty()) {
            return Status.error(new Error(`No message with id ${messageId}`));
        }
        try {
            return await subscriber.handler(message.get());
        } catch (error) {
            return Status.error(error as Error);
        }
    }
}
