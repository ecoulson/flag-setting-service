import { Module } from 'noose-injection';
import { MessageIdempotencyServiceAnnotation } from './message-idempotency-service-annotations';
import { StoredMessageIdempotencyService } from './stored-message-idempotency-service';

export class MessageIdempotencyServiceModule extends Module {
    configure(): void {
        this.registerClass(
            MessageIdempotencyServiceAnnotation,
            StoredMessageIdempotencyService
        );
    }
}
