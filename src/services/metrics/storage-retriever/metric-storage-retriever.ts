import { Injectable } from 'noose-injection';
import { ElapsedTimeMetric } from '../../../models/metrics/elasped-time-metric';
import { Metric } from '../../../models/metrics/metric';
import { MetricType } from '../../../models/metrics/metric-type';
import { MetricStorage } from '../../../storage/metrics/metric-storage';
import { ElapsedTimeMetricStorageAnnotation } from '../../../storage/metrics/metric-storage-annotations';

@Injectable()
export class MetricStorageRetriever {
    constructor(
        @ElapsedTimeMetricStorageAnnotation.inject()
        private readonly elapsedTimeMetricStorage: MetricStorage<ElapsedTimeMetric>
    ) {}

    retrieve<T extends Metric>(type: MetricType): MetricStorage<T> {
        switch (type) {
            case MetricType.ElapsedTime:
                return this.elapsedTimeMetricStorage as MetricStorage<T>;
            default:
                throw new Error("Should never reach here.");
        }
    }
}
