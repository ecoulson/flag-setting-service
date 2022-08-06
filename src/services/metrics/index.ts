import { Module } from 'noose-injection';
import { MetricProcessorModule } from './processor';
import { MetricRecorderModule } from './recorder';
import { MetricStorageRetrieverModule } from './storage-retriever';

export class MetricServiceModule extends Module {
    configure(): void {
        this.registerModule(new MetricRecorderModule());
        this.registerModule(new MetricProcessorModule());
        this.registerModule(new MetricStorageRetrieverModule());
    }
}
