import { Injectable } from 'noose-injection';
import { Status } from '../../../common/status/status';
import { Event } from '../../../models/events/event';
import { MessageQueueSubscriber } from '../../../models/message-queue/message-queue-subscriber';
import { Time } from '../../../models/time/time';
import { Executor } from '../executor/executor';
import { ScheduledExecutorAnnotation } from '../executor/executor-annotation';
import { ScheduledExecutor } from '../executor/scheduled-executor';
import { RetryStrategy } from '../retry-strategy';
import {
    LinearRetryStrategyAttemptsAnnotation,
    LinearRetryStrategyDelayAnnotation,
} from './linear-retry-strategy-annotations';

@Injectable()
export class LinearRetryStrategy implements RetryStrategy {
    constructor(
        @ScheduledExecutorAnnotation.inject()
        private readonly executor: ScheduledExecutor,
        @LinearRetryStrategyDelayAnnotation.inject()
        private readonly delay: Time,
        @LinearRetryStrategyAttemptsAnnotation.inject()
        private readonly attempts: number
    ) {}

    async execute(executor: Executor): Promise<Status> {
        for (let i = 0; i < this.attempts; i++) {
            const result = await this.executor.executeAfter(
                executor,
                this.delay
            );
            if (result.ok()) {
                return result;
            }
        }
        return Status.error();
    }
}
