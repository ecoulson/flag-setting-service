import { Injectable } from 'noose-injection';
import { Message } from '../../../../models/messages/message';
import { ElapsedTimeMetric } from '../../../../models/metrics/elasped-time-metric';
import { Metric } from '../../../../models/metrics/metric';
import { MetricStorage } from '../../../../storage/metrics/metric-storage';
import { ElapsedTimeMetricStorageAnnotation } from '../../../../storage/metrics/metric-storage-annotations';
import { MetricProcessor } from '../metric-processor';

@Injectable()
export class LocalMetricProcessor implements MetricProcessor {
    constructor(
        @ElapsedTimeMetricStorageAnnotation.inject()
        private readonly elapsedTimeMetricStorage: MetricStorage<ElapsedTimeMetric>
    ) {}

    async process(message: Message<Metric>): Promise<boolean> {
        await this.elapsedTimeMetricStorage.create(
            message.data as ElapsedTimeMetric
        );
        return true;
    }
}
