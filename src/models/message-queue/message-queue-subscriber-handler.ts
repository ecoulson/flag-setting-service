import { Status } from '../../common/status/status';
import { Message } from '../messages/message';

export type MessageQueueSubscriberHandler<T = unknown> = (
    message: Message<T>
) => Promise<Status>;
