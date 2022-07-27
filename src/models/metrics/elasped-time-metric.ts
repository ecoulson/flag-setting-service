import { Metric } from './metric';
import { MetricType } from './metric-type';

export class ElapsedTimeMetric implements Metric<number> {
    constructor(
        private readonly _tag: string,
        private readonly elapsedTime: number
    ) {}

    type(): MetricType {
        return MetricType.ElapsedTime;
    }

    tag(): string {
        return this._tag;
    }

    value(): number {
        return this.elapsedTime;
    }
}
