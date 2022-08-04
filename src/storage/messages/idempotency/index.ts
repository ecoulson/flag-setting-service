import { Module } from 'noose-injection';
import { MessageIdempotencyStorageAnnotation } from './message-idempotency-storage-annotations';
import { SQLMessageIdempotencyStorage } from './sql-message-idempotency-storage';

export class MessageIdempotencyStorageModule extends Module {
    configure(): void {
        this.registerClass(
            MessageIdempotencyStorageAnnotation,
            SQLMessageIdempotencyStorage
        );
    }
}
