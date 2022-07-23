import { Module } from 'noose-injection';
import { FlagServiceModule } from './flags';

export class ServiceModule extends Module {
    configure(): void {
        this.registerModule(new FlagServiceModule());
    }
}
