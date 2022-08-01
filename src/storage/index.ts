import { Module } from 'noose-injection';
import { FlagStorageModule } from './flags';
import { MessageStorageModule } from './messages';

export class StorageModule extends Module {
    configure(): void {
        this.registerModule(new FlagStorageModule());
        this.registerModule(new MessageStorageModule());
    }
}
