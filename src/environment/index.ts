import { Module } from 'noose-injection';
import { SystemEnvironmentModule } from './system';
import { EnvironmentVariableModule } from './variable';

export class EnvironmentModule extends Module {
    configure(): void {
        this.registerModule(new EnvironmentVariableModule());
        this.registerModule(new SystemEnvironmentModule());
    }
}
