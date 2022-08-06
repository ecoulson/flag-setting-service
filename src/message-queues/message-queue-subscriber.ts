import { Message } from '../models/messages/message';

export type MessageQueueSubscriber<T = unknown> = (message: Message<T>) => void;
