import { LocalMessageQueueAnnotation } from '../local/local-message-queue-annotations';
import { MessageQueue } from '../message-queue';
import { MessageQueueConnectionStrategy } from './message-queue-connection-strategy';

export abstract class LocalMessageQueueConnectionStrategy<T>
    implements MessageQueueConnectionStrategy
{
    constructor(
        @LocalMessageQueueAnnotation.inject()
        protected readonly messageQueue: MessageQueue<T>
    ) {}

    async initialize(): Promise<void> {
        this.registerSubscribers();
    }

    protected abstract registerSubscribers(): Promise<void>;
}
