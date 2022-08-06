import { Module } from 'noose-injection';
import { MessageQueueIdempotencyModule } from './idempotency';
import { LocalMessageQueueModule } from './local';
import { MetricMessageQueueConnectionStrategyModule } from './metrics';

export class MessageQueueModule extends Module {
    configure(): void {
        this.registerModule(new LocalMessageQueueModule());
        this.registerModule(new MessageQueueIdempotencyModule());
        this.registerModule(new MetricMessageQueueConnectionStrategyModule());
    }
}
