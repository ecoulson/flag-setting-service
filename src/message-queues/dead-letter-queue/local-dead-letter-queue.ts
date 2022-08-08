import { Injectable } from 'noose-injection';
import { Status } from '../../common/status/status';
import { MessageQueueSubscriber } from '../../models/message-queue/message-queue-subscriber';
import { DroppedMessage } from '../../models/messages/dropped-message';
import { Message } from '../../models/messages/message';
import { DroppedMessageStorage } from '../../storage/messages/dropped-messages/dropped-message-storage';
import { DroppedMessageStorageAnnotation } from '../../storage/messages/dropped-messages/dropped-message-storage-annotation';
import { DeadLetterQueue } from './dead-letter-queue';

@Injectable()
export class LocalDeadLetterQueue implements DeadLetterQueue {
    constructor(
        @DroppedMessageStorageAnnotation.inject()
        private readonly storage: DroppedMessageStorage
    ) {}

    async addDroppedMessage(
        subscriber: MessageQueueSubscriber,
        message: Message
    ): Promise<Status> {
        const droppedMessage = new DroppedMessage(
            message.id,
            message.topic,
            subscriber.id,
            message.data
        );
        const createdMessage = await this.storage.create(droppedMessage);
        if (createdMessage.isEmpty()) {
            return Status.error();
        }
        return Status.ok();
    }
}
