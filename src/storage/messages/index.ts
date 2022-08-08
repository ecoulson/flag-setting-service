import { Module } from 'noose-injection';
import { DroppedMessageStorageModule } from './dropped-messages';
import { MessageIdempotencyStorageModule } from './idempotency';
import { MessageStorageAnnotation } from './message-storage-annotations';
import { SQLMessageStorage } from './sql-message-storage';

export class MessageStorageModule extends Module {
    configure(): void {
        this.registerClass(MessageStorageAnnotation, SQLMessageStorage);
        this.registerModule(new MessageIdempotencyStorageModule());
        this.registerModule(new DroppedMessageStorageModule());
    }
}
