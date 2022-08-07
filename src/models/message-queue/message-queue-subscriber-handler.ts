import { Message } from '../messages/message';

export type MessageQueueSubscriberHandler<T = unknown> = (
    message: Message<T>
) => void;
