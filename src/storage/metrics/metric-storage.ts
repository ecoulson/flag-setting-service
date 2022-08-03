import { Metric } from '../../models/metrics/metric';
import { Storage } from '../storage';

export interface MetricStorage extends Storage<Metric> {
    findByTag(tag: string): Promise<Metric[]>;
}
