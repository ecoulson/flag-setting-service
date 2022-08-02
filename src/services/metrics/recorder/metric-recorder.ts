import { Metric } from '../../../models/metrics/metric';

export interface MetricRecorder {
    record(metric: Metric): Promise<boolean>;
}
