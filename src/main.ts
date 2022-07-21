import { Module } from 'noose-injection';
import { DatabaseModule } from './database';
import { EnvironmentModule } from './environment';
import { ModelModule } from './models';
import { ServerModule } from './server';
import { StorageModule } from './storage';

export class MainModule extends Module {
    configure(): void {
        this.registerModule(new DatabaseModule());
        this.registerModule(new EnvironmentModule());
        this.registerModule(new ModelModule());
        this.registerModule(new ServerModule());
        this.registerModule(new StorageModule());
    }
}
