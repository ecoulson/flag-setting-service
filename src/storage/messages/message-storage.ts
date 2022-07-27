import { Message } from '../../models/messages/message';
import { Storage } from '../storage';

export interface MessageStorage extends Storage<Message> {
    findByTopic(topic: string): Promise<Message[]>;
}
