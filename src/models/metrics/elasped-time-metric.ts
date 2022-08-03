import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Metric } from './metric';
import { MetricType } from './metric-type';

@Entity()
export class ElapsedTimeMetric implements Metric<number> {
    @PrimaryColumn()
    public id: string;
    @Column()
    public tag: string;
    @Column()
    public type: MetricType;
    @Column()
    public value: number;

    constructor(id: string, tag: string, elapsedTime: number) {
        this.id = id;
        this.tag = tag;
        this.type = MetricType.ElapsedTime;
        this.value = elapsedTime;
    }
}
