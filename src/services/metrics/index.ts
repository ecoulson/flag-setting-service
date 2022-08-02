import { Module } from 'noose-injection';
import { MetricRecorderModule } from './recorder';

export class MetricServiceModule extends Module {
    configure(): void {
        this.registerModule(new MetricRecorderModule());
    }
}
