import { Module } from 'noose-injection';
import { ConnectionStringModule } from './connection-string';
import { DialectModule } from './dialect';
import { TypeORMModule } from './typeorm';

export class DatabaseModule extends Module {
    configure(): void {
        this.registerModule(new TypeORMModule());
        this.registerModule(new ConnectionStringModule());
        this.registerModule(new DialectModule());
    }
}
