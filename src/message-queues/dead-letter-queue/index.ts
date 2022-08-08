import { Module } from 'noose-injection';

export class DeadLetterQueueModule extends Module {
    configure(): void {
        throw new Error('Method not implemented.');
    }
}
