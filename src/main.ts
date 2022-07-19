import { Module } from 'noose-injection';
import { ServerModule } from './server';

export class MainModule extends Module {
    configure(): void {
        this.registerModule(new ServerModule());
    }
}
