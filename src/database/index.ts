import { Module } from 'noose-injection';
import { ConnectionStringModule } from './connection-string';
import { DatabaseDebugModule } from './debug-info';
import { DialectModule } from './dialect';
import { DatabaseEntitiesModule } from './entities';
import { TypeORMModule } from './typeorm';

export class DatabaseModule extends Module {
    configure(): void {
        this.registerModule(new TypeORMModule());
        this.registerModule(new ConnectionStringModule());
        this.registerModule(new DialectModule());
        this.registerModule(new DatabaseDebugModule());
        this.registerModule(new DatabaseEntitiesModule());
    }
}
