import { Module } from 'noose-injection';
import { MessageQueueConnectionStrategyModule } from './connection-strategy';
import { MessageQueueIdempotencyModule } from './idempotency';
import { LocalMessageQueueModule } from './local';
import { MetricMessageQueueConnectionStrategyModule } from './metrics';
import { NotificationStrategyModule } from './notification-strategy';
import { RetryStrategyModule } from './retry-strategy';

export class MessageQueueModule extends Module {
    configure(): void {
        this.registerModule(new LocalMessageQueueModule());
        this.registerModule(new MessageQueueIdempotencyModule());
        this.registerModule(new MetricMessageQueueConnectionStrategyModule());
        this.registerModule(new NotificationStrategyModule());
        this.registerModule(new RetryStrategyModule());
        this.registerModule(new MessageQueueConnectionStrategyModule());
    }
}
