import { Module } from 'noose-injection';
import { App } from './app';
import { AppAnnotation } from './app-annotations';
import { ConnectionModule } from './connections';
import { DatabaseModule } from './database';
import { EnvironmentModule } from './environment';
import { EventModule } from './events';
import { IdentifierModule } from './identifiers';
import { LoggingModule } from './logging';
import { MessageQueueModule } from './message-queues';
import { ModelModule } from './models';
import { ServerModule } from './server';
import { ServiceModule } from './services';
import { StorageModule } from './storage';

export class MainModule extends Module {
    configure(): void {
        this.registerClass(AppAnnotation, App);
        this.registerModule(new DatabaseModule());
        this.registerModule(new EnvironmentModule());
        this.registerModule(new LoggingModule());
        this.registerModule(new ModelModule());
        this.registerModule(new ServerModule());
        this.registerModule(new ServiceModule());
        this.registerModule(new StorageModule());
        this.registerModule(new MessageQueueModule());
        this.registerModule(new EventModule());
        this.registerModule(new IdentifierModule());
        this.registerModule(new ConnectionModule());
    }
}
