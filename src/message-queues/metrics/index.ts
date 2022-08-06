import { Module } from 'noose-injection';
import { MetricLocalMessageQueueConnectionStrategyAnnotation } from './connection-strategy-annotation';
import { MetricsLocalConnectionStrategy } from './metrics-local-connection-strategy';

export class MetricMessageQueueConnectionStrategyModule extends Module {
    configure(): void {
        this.registerClass(
            MetricLocalMessageQueueConnectionStrategyAnnotation,
            MetricsLocalConnectionStrategy
        );
    }
}
