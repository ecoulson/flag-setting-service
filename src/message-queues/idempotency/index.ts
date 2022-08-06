import { Module } from 'noose-injection';
import { MessageQueueIdempotencyAnnotation } from './message-queue-idempotency-annotations';
import { LocalMessageQueueIdempotencyService } from './local-message-idempotency-service';

export class MessageQueueIdempotencyModule extends Module {
    configure(): void {
        this.registerClass(
            MessageQueueIdempotencyAnnotation,
            LocalMessageQueueIdempotencyService
        );
    }
}
