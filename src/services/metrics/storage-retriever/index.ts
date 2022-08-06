import { Module } from 'noose-injection';
import { MetricStorageRetriever } from './metric-storage-retriever';
import { MetricStorageRetrieverAnnotation } from './metric-storage-retriever-annotation';

export class MetricStorageRetrieverModule extends Module {
    configure(): void {
        this.registerClass(
            MetricStorageRetrieverAnnotation,
            MetricStorageRetriever
        );
    }
}
