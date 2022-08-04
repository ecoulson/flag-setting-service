import { Metric } from '../../models/metrics/metric';
import { Storage } from '../storage';

export interface MetricStorage<T extends Metric> extends Storage<T> {
    findByTag(tag: string): Promise<T[]>;
}
