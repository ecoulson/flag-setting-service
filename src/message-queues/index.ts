import { Module } from 'noose-injection';
import { MessageQueueIdempotencyModule } from './idempotency';
import { LocalMessageQueueModule } from './local';

export class MessageQueueModule extends Module {
    configure(): void {
        this.registerModule(new LocalMessageQueueModule());
        this.registerModule(new MessageQueueIdempotencyModule());
    }
}
