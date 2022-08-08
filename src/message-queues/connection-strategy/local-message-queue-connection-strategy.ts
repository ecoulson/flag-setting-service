import { Status } from '../../common/status/status';
import { LocalMessageQueueAnnotation } from '../local/local-message-queue-annotations';
import { MessageQueue } from '../message-queue';
import { ConnectionStrategy } from '../../connections/connection-strategy/connection-strategy';

export abstract class LocalMessageQueueConnectionStrategy<T = unknown>
    implements ConnectionStrategy
{
    constructor(
        @LocalMessageQueueAnnotation.inject()
        protected readonly messageQueue: MessageQueue<T>
    ) {}

    async initialize(): Promise<Status> {
        this.registerSubscribers();
        return Status.ok();
    }

    protected abstract registerSubscribers(): Promise<void>;
}
