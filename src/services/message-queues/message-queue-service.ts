import { Message } from '../../models/messages/message';
import { MessageHandler } from './message-handler';

export interface MessageQueueService {
    publish(message: Message): Promise<boolean>;
    subscribe(topic: string, handler: MessageHandler): Promise<boolean>;
}
