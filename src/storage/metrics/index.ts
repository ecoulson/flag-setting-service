import { Module } from 'noose-injection';
import { ElapsedTimeMetricStorageAnnotation } from './metric-storage-annotations';
import { SQLElapsedTimeMetricStorage } from './sql-elapsed-time-metric-storage';

export class MetricStorageModule extends Module {
    configure(): void {
        this.registerClass(
            ElapsedTimeMetricStorageAnnotation,
            SQLElapsedTimeMetricStorage
        );
    }
}
