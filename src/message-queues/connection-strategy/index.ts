import { Module } from 'noose-injection';
import { MetricsLocalConnectionStrategy } from '../metrics/metrics-local-connection-strategy';
import { MetricMessageQueueConnectionStrategyAnnotation } from './message-queue-connection-strategy-annotation';

export class MessageQueueConnectionStrategyModule extends Module {
    configure(): void {
        this.registerClass(
            MetricMessageQueueConnectionStrategyAnnotation,
            MetricsLocalConnectionStrategy
        );
    }
}
