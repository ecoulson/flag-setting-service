import { Status } from '../../common/status/status';
import { Event } from '../../models/events/event';
import { MessageQueueSubscriber } from '../../models/message-queue/message-queue-subscriber';
import { Executor } from './executor/executor';

export interface RetryStrategy {
    execute(executor: Executor): Promise<Status>;
}
