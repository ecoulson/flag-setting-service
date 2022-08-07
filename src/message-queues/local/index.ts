import { Module } from 'noose-injection';
import { LocalMessageQueue } from './local-message-queue';
import { LocalMessageQueueAnnotation } from './local-message-queue-annotations';

export class LocalMessageQueueModule extends Module {
    configure(): void {
        this.registerClass(LocalMessageQueueAnnotation, LocalMessageQueue);
    }
}
