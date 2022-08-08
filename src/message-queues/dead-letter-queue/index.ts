import { Module } from 'noose-injection';
import { DeadLetterQueueAnnotation } from './dead-letter-queue-annotation';
import { LocalDeadLetterQueue } from './local-dead-letter-queue';

export class DeadLetterQueueModule extends Module {
    configure(): void {
        this.registerClass(DeadLetterQueueAnnotation, LocalDeadLetterQueue);
    }
}
