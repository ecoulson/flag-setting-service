import { Module } from 'noose-injection';
import { TypeORMModule } from './database/typeorm';
import { ServerModule } from './server';
import { FlagStorageModule } from './storage/flags';

export class MainModule extends Module {
    configure(): void {
        this.registerModule(new ServerModule());
        this.registerModule(new TypeORMModule());
        this.registerModule(new FlagStorageModule());
    }
}
