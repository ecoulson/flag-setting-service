import { Module } from 'noose-injection';
import { FlagStorageModule } from './flags';
import { MessageStorageModule } from './messages';
import { MetricStorageModule } from './metrics';

export class StorageModule extends Module {
    configure(): void {
        this.registerModule(new FlagStorageModule());
        this.registerModule(new MessageStorageModule());
        this.registerModule(new MetricStorageModule());
    }
}
