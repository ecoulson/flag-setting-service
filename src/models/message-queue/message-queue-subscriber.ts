import { Optional } from '../../common/optional/optional';
import { MessageQueueSubscriberHandler } from './message-queue-subscriber-handler';

export class MessageQueueSubscriber<T = unknown> {
    public id: string;
    public handler: MessageQueueSubscriberHandler<T>;
    public deadLetterHandler: Optional<MessageQueueSubscriberHandler<T>>;

    constructor(
        id: string,
        handler: MessageQueueSubscriberHandler<T>,
        deadLetterHandler: Optional<MessageQueueSubscriberHandler<T>>
    ) {
        this.id = id;
        this.handler = handler;
        this.deadLetterHandler = deadLetterHandler;
    }
}
