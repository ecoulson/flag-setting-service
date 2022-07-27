import { Metric } from '../../../models/metrics/metric';

export interface MetricRecorderService {
    record(metric: Metric): Promise<boolean>;
}
