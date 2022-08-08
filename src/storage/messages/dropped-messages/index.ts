import { Module } from 'noose-injection';
import { DroppedMessageStorageAnnotation } from './dropped-message-storage-annotation';
import { SQLDroppedMessageStorage } from './sql-dropped-message-storage';

export class DroppedMessageStorageModule extends Module {
    configure(): void {
        this.registerClass(
            DroppedMessageStorageAnnotation,
            SQLDroppedMessageStorage
        );
    }
}
