import { Module } from 'noose-injection';
import { LocalMessageQueueServiceModule } from './local';

export class MessageQueueServiceModule extends Module {
    configure(): void {
        this.registerModule(new LocalMessageQueueServiceModule());
    }
}
