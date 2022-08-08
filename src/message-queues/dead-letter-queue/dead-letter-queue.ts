import { Status } from '../../common/status/status';
import { MessageQueueSubscriber } from '../../models/message-queue/message-queue-subscriber';
import { Message } from '../../models/messages/message';

export interface DeadLetterQueue {
    addDroppedMessage(
        subscriber: MessageQueueSubscriber,
        message: Message
    ): Promise<Status>;
}
