import { Injectable } from 'noose-injection';
import { Message } from '../../../../models/messages/message';
import { Metric } from '../../../../models/metrics/metric';
import { MetricStorageRetriever } from '../../storage-retriever/metric-storage-retriever';
import { MetricStorageRetrieverAnnotation } from '../../storage-retriever/metric-storage-retriever-annotation';
import { MetricProcessor } from '../metric-processor';

@Injectable()
export class LocalMetricProcessor implements MetricProcessor {
    constructor(
        @MetricStorageRetrieverAnnotation.inject()
        private readonly storageRetriever: MetricStorageRetriever
    ) {}

    async process(message: Message<Metric>): Promise<boolean> {
        const metric = message.data;
        const storage = this.storageRetriever.retrieve(metric.type);
        await storage.create(metric);
        return true;
    }
}
