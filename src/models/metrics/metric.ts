import { MetricType } from './metric-type';

export interface Metric<T = unknown> {
    id: string;
    type: MetricType;
    tag: string;
    value: T;
}
