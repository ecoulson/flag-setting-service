import { Module } from 'noose-injection';
import { MessageIdempotencyServiceModule } from './idempotency';
import { LocalMessageQueueServiceModule } from './local';

export class MessageQueueServiceModule extends Module {
    configure(): void {
        this.registerModule(new LocalMessageQueueServiceModule());
        this.registerModule(new MessageIdempotencyServiceModule());
    }
}
