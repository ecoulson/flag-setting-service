import { Module } from 'noose-injection';
import { FlagServiceModule } from './flags';
import { MetricServiceModule } from './metrics';

export class ServiceModule extends Module {
    configure(): void {
        this.registerModule(new FlagServiceModule());
        this.registerModule(new MetricServiceModule());
    }
}
