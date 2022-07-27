import { MetricType } from './metric-type';

export interface Metric<T = unknown> {
    type(): MetricType;
    tag(): string;
    value(): T;
}
