import { Module } from 'noose-injection';
import { MessageStorageAnnotation } from './message-storage-annotations';
import { SQLMessageStorage } from './sql-message-storage';

export class MessageStorageModule extends Module {
    configure(): void {
        this.registerClass(MessageStorageAnnotation, SQLMessageStorage);
    }
}
