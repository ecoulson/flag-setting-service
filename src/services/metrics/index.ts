import { Module } from 'noose-injection';
import { MetricRecorderServiceModule } from './recorder';

export class MetricServiceModule extends Module {
    configure(): void {
        this.registerModule(new MetricRecorderServiceModule());
    }
}
