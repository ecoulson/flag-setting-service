import { Message } from '../../models/messages/message';

export type MessageHandler<T = unknown> = (message: Message<T>) => void;
