import { Module } from 'noose-injection';
import { EventServiceModule } from './events';
import { FlagServiceModule } from './flags';
import IdentifierServiceModule from './identifier';
import { MessageQueueServiceModule } from './message-queues';
import { MetricServiceModule } from './metrics';

export class ServiceModule extends Module {
    configure(): void {
        this.registerModule(new FlagServiceModule());
        this.registerModule(new EventServiceModule());
        this.registerModule(new IdentifierServiceModule());
        this.registerModule(new MessageQueueServiceModule());
        this.registerModule(new MetricServiceModule());
    }
}
