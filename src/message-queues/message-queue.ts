import { Message } from '../models/messages/message';
import { MessageQueueSubscriber } from '../models/message-queue/message-queue-subscriber';
import { Status } from '../common/status/status';

export interface MessageQueue<T = unknown> {
    publish(message: Message<T>): Promise<Status>;
    subscribe(
        topic: string,
        subscriber: MessageQueueSubscriber<T>
    ): Promise<Status>;
}
