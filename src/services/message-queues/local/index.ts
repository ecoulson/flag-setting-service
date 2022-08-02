import { Module } from 'noose-injection';
import { LocalMessageQueueService } from './local-message-queue-service';
import { LocalMessageQueueAnnotation } from './local-message-queue-annotations';

export class LocalMessageQueueServiceModule extends Module {
    configure(): void {
        this.registerClass(
            LocalMessageQueueAnnotation,
            LocalMessageQueueService
        );
    }
}
