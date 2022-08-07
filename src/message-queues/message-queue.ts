import { Message } from '../models/messages/message';
import { MessageQueueSubscriber } from '../models/message-queue/message-queue-subscriber';

export interface MessageQueue<T = unknown> {
    publish(message: Message<T>): Promise<boolean>;
    subscribe(
        topic: string,
        subscriber: MessageQueueSubscriber<T>
    ): Promise<boolean>;
}
