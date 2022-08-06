import { MessageQueueConnectionStrategy } from './message-queue-connection-strategy';

export abstract class LocalMessageQueueConnectionStrategy
    implements MessageQueueConnectionStrategy
{
    constructor(@MessageQueue) {

    }

    initialize(): Promise<void> {
        throw new Error('Method not implemented.');
    }

    protected abstract registerSubscribers(): Promise<void>;
}
