import { Metric } from '../../models/metrics/metric';
import { Storage } from '../storage';

export interface MetricStorage<T = unknown> extends Storage<Metric<T>> {
    findByTag(tag: string): Promise<Metric<T>[]>;
}
