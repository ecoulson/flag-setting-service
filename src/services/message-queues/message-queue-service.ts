import { Message } from '../../models/messages/message';
import { MessageHandler } from './message-handler';

export interface MessageQueueService<T = unknown> {
    publish(message: Message<T>): Promise<boolean>;
    subscribe(topic: string, handler: MessageHandler<T>): Promise<boolean>;
}
