import { Metric } from './metric';
import { MetricType } from './metric-type';

export class ElapsedTimeMetric implements Metric<number> {
    public id: string;
    public tag: string;
    public type: MetricType;
    public value: number;

    constructor(id: string, tag: string, elapsedTime: number) {
        this.id = id;
        this.tag = tag;
        this.type = MetricType.ElapsedTime;
        this.value = elapsedTime;
    }
}
