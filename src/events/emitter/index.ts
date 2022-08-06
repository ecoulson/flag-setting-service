import { Module } from 'noose-injection';
import { EventEmitter } from './event-emitter';
import { EventEmitterAnnotation } from './event-emitter-annotations';

export class EventEmitterModule extends Module {
    configure(): void {
        this.registerClass(EventEmitterAnnotation, EventEmitter);
    }
}
