import { Module } from 'noose-injection';
import { MetricStorageAnnotation } from './metric-storage-annotations';
import { SQLMetricStorage } from './sql-metric-storage';

export class MetricStorageModule extends Module {
    configure(): void {
        this.registerClass(MetricStorageAnnotation, SQLMetricStorage);
    }
}
