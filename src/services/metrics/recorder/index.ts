import { Module } from 'noose-injection';
import { LocalMetricRecorderService } from './local-metric-service';
import { LocalMetricRecorderServiceAnnotation } from './metric-recorder-service-annotations';

export class MetricRecorderServiceModule extends Module {
    configure(): void {
        this.registerClass(
            LocalMetricRecorderServiceAnnotation,
            LocalMetricRecorderService
        );
    }
}
