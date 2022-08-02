import { Module } from 'noose-injection';
import { EventEmitterModule } from './emitter';

export class EventServiceModule extends Module {
    configure(): void {
        this.registerModule(new EventEmitterModule());
    }
}
