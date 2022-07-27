import { Message } from '../../models/messages/message';
import { MessageHandler } from './message-handler';
import { MessageQueueService } from './message-queue-service';

export class LocalMessageQueueService implements MessageQueueService {
    subscribe(topic: string, handler: MessageHandler): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    publish(message: Message<unknown>): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}
