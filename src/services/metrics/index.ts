import { Module } from 'noose-injection';
import { MetricProcessorModule } from './processor';
import { MetricRecorderModule } from './recorder';

export class MetricServiceModule extends Module {
    configure(): void {
        this.registerModule(new MetricRecorderModule());
        this.registerModule(new MetricProcessorModule());
    }
}
