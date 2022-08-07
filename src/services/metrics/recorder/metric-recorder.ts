import { Status } from '../../../common/status/status';
import { Metric } from '../../../models/metrics/metric';

export interface MetricRecorder {
    record(metric: Metric): Promise<Status>;
}
