import { Module } from 'noose-injection';
import { MessageIdempotencyStorageModule } from './idempotency';
import { MessageStorageAnnotation } from './message-storage-annotations';
import { SQLMessageStorage } from './sql-message-storage';

export class MessageStorageModule extends Module {
    configure(): void {
        this.registerClass(MessageStorageAnnotation, SQLMessageStorage);
        this.registerModule(new MessageIdempotencyStorageModule());
    }
}
