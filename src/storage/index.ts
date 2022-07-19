import { Module } from 'noose-injection';
import { FlagStorageModule } from './flags';

export class StorageModule extends Module {
    configure(): void {
        this.registerModule(new FlagStorageModule());
    }
}
