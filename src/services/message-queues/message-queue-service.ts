import { Message } from '../../models/messages/message';

export interface MessageQueueService {
    enqueue(message: Message): Promise<boolean>;
}
