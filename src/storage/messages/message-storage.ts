import { Message } from '../../models/messages/message';
import { Storage } from '../storage';

export interface MessageStorage<T = unknown> extends Storage<Message<T>> {
    findByTopic(topic: string): Promise<Message<T>[]>;
}
