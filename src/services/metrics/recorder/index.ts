import { Module } from 'noose-injection';
import { LocalMetricRecorder } from './local/local-metric-recorder';
import { LocalMetricRecorderAnnotation } from './metric-recorder-annotations';

export class MetricRecorderModule extends Module {
    configure(): void {
        this.registerClass(LocalMetricRecorderAnnotation, LocalMetricRecorder);
    }
}
