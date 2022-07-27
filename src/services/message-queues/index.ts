import { Module } from 'noose-injection';
import { LocalMessageQueueService } from './local-message-queue-service';
import { LocalMessageQueueAnnotation } from './message-queue-annotations';

export class MessageQueueServiceModule extends Module {
    configure(): void {
        this.registerClass(
            LocalMessageQueueAnnotation,
            LocalMessageQueueService
        );
    }
}
