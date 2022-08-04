import { Module } from 'noose-injection';
import { LocalMetricProcessor } from './local/local-metric-processor';
import { MetricProcessorAnnotation } from './metric-processor-annotations';

export class MetricProcessorModule extends Module {
    configure(): void {
        this.registerClass(MetricProcessorAnnotation, LocalMetricProcessor);
    }
}
