import { Module } from 'noose-injection';
import { ConnectionStringModule } from './connection-string';

export class ConnectionModule extends Module {
    configure(): void {
        this.registerModule(new ConnectionStringModule());
    }
}
