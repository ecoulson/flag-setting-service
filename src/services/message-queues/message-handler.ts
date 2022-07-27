import { Message } from '../../models/messages/message';

export type MessageHandler = (message: Message) => void;
