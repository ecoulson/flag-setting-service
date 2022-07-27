import { Message } from '../../models/messages/message';
import { MessageQueueService } from './message-queue-service';

export class LocalMessageQueueService implements MessageQueueService {
    enqueue(message: Message<unknown>): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}
