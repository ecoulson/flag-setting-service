import { Module } from 'noose-injection';
import { DatabaseDebugModule } from './debug-info';
import { DialectModule } from './dialect';
import { FlagDatabaseModule } from './flags';
import { MessageDatabaseModule } from './messages';
import { MetricDatabaseModule } from './metrics';
import { TypeORMModule } from './typeorm';

export class DatabaseModule extends Module {
    configure(): void {
        this.registerModule(new TypeORMModule());
        this.registerModule(new DialectModule());
        this.registerModule(new DatabaseDebugModule());
        this.registerModule(new MessageDatabaseModule());
        this.registerModule(new FlagDatabaseModule());
        this.registerModule(new MetricDatabaseModule());
    }
}
