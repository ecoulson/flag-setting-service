import { Module } from 'noose-injection';
import { SystemEnvironmentModule } from './system';

export class EnvironmentModule extends Module {
    configure(): void {
        this.registerModule(new SystemEnvironmentModule());
    }
}
